import shelljs from 'shelljs';

const detailsRegex = /Id=(.+)\nActiveState=(.+)\nStateChangeTimestamp=(.+)/m;

function systemdStatus(_services) {
  if (!Array.isArray(_services) && typeof _services !== 'string') { throw new Error('Input must be an Array or a String'); }
  const services = typeof _services === 'string' ? [ _services ] : _services;
  const command = `systemctl show ${services.join(' ')} -p Id -p ActiveState -p StateChangeTimestamp`;

  const currentStatus = shelljs.exec(command, { silent: true })
    .trim()
    .split('\n\n')
    .map((serviceData) => {
      let name, activeState, timestamp;
      try {
        [, name, activeState, timestamp] = serviceData.match(detailsRegex);
      } catch (e) {
        throw new Error('Unknown service');
      }
      name = name.split('.').slice(0, -1).join('.');
      timestamp = timestamp.split(' ').slice(0, -1).join(' ');
      return {
        name,
        isActive: activeState === 'active',
        timestamp: new Date(timestamp)
      };
    });

    return currentStatus.length === 1 ? currentStatus[0] : currentStatus;
}

export default systemdStatus;
