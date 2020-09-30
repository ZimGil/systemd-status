import shelljs from 'shelljs';
import sliceLast from './slice-last';

const detailsRegex = /Id=(.+)\nActiveState=(.+)\nSubState=(.+)\nUnitFileState=(.+)\nStateChangeTimestamp=(.+)?/m;

function systemdStatus(_services, _execFn) {
  const isArray = Array.isArray(_services);
  if (!isArray && typeof _services !== 'string') { throw new Error('Input must be an Array or a String'); }
  if (isArray && !_services.length) { return []; }
  const services = typeof _services === 'string' ? [_services] : _services;
  const command = [
    `systemctl show ${services.join(' ')}`,
    'Id',
    'ActiveState',
    'SubState',
    'UnitFileState',
    'StateChangeTimestamp'
  ].join(' -p ');

  const execFn = typeof _execFn === 'function' ? _execFn : shelljs.exec;
  const currentStatus = execFn(command, { silent: true })
    .trim()
    .split('\n\n')
    .map((serviceData) => {
      const properties = serviceData.match(detailsRegex);
      if (!properties) { throw new Error('Unknown service'); }
      let [, name, activeState, state, unitFileState, timestamp] = properties;
      name = sliceLast(name, '.');
      timestamp = timestamp ? new Date(sliceLast(timestamp, ' ')) : null;
      return {
        name,
        state,
        timestamp,
        isActive: activeState === 'active',
        isDisabled: unitFileState === 'disabled'
      };
    });

  return currentStatus.length === 1 ? currentStatus[0] : currentStatus;
}

export default systemdStatus;
