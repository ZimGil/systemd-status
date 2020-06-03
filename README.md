# systemd-status
Get your current systemd service status

## Installation
`npm install systemd-status`

## Usage
You can use the `systemdStatus` function to get the status of either a single or multiple services.

### Getting a single service status

```JavaScript
const systemdStatus = require('systemd-status');

const plexStatus = systemdStatus('plexmediaserver');
// {
//   name: 'plexmediaserver',
//   isActive: true / false,
//   timestamp: '2020-06-02T13:21:51.716Z'
// }
```

### Getting multiple services status

```JavaScript
const systemdStatus = require('systemd-status');

const currentStatus = systemdStatus(['plexmediaserver', 'smbd']);
// [
//   {
//     name: 'plexmediaserver',
//     isActive: true / false,
//     timestamp: '2020-06-02T13:21:51.716Z'
//   },
//   {
//     name: 'smbd',
//     isActive: true / false,
//     timestamp: '2020-06-02T13:21:51.716Z'
//   }
// ]
```
