import shelljs from 'shelljs';

const detailsRegex = /Id=(.+)\nActiveState=(.+)\nSubState=(.+)\nStateChangeTimestamp=(.+)/m;

function systemdStatus(_services, _execFn) {
  const isArray = Array.isArray(_services);
  if (!isArray && typeof _services !== 'string') { throw new Error('Input must be an Array or a String'); }
  if (isArray && !_services.length) { return []; }
  const services = typeof _services === 'string' ? [ _services ] : _services;
  const command = [
    `systemctl show ${services.join(' ')}`,
    'Id',
    'ActiveState',
    'SubState',
    'StateChangeTimestamp'
  ].join(' -p ');

  const execFn = typeof _execFn === 'function' ? _execFn : shelljs.exec;
  const currentStatus = execFn(command, { silent: true })
    .trim()
    .split('\n\n')
    .map((serviceData) => {
      let name, activeState, state, timestamp;
      try {
        [, name, activeState, state, timestamp] = serviceData.match(detailsRegex);
      } catch (e) {
        throw new Error('Unknown service');
      }
      name = name.split('.').slice(0, -1).join('.');
      timestamp = timestamp.split(' ').slice(0, -1).join(' ');
      return {
        name,
        state,
        isActive: activeState === 'active',
        timestamp: new Date(timestamp)
      };
    });

    return currentStatus.length === 1 ? currentStatus[0] : currentStatus;
}

export default systemdStatus;
