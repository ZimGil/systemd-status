# systemd-status
Get your current systemd service status

## Installation
`npm install systemd-status`  
> ***Note***: as `systemd` only available on `Linux`, it can only be installed on `Linux` machines.  
> If still wish to install it (for development reasons) use `--force`

## Usage
You can use the `systemdStatus` function to get the status of either a single or multiple services.

### Getting a single service status

```JavaScript
const systemdStatus = require('systemd-status');

const plexStatus = systemdStatus('plexmediaserver');
// {
//   name: 'plexmediaserver',
//   isActive: true,
//   state: 'running',
//   timestamp: '2020-06-02T13:21:51.716Z',
//   isDisabled: false
// }
```

### Getting multiple services status

```JavaScript
const systemdStatus = require('systemd-status');

const currentStatus = systemdStatus(['plexmediaserver', 'smbd', 'pihole-FTL']);
// [
//   {
//     name: 'plexmediaserver',
//     isActive: true,
//     state: 'running',
//     timestamp: '2020-06-02T13:21:51.716Z',
//     isDisabled: false
//   },
//   {
//     name: 'smbd',
//     isActive: false,
//     state: 'dead',
//     timestamp: null,
//     isDisabled: true
//   }
//   {
//     name: 'pihole-FTL',
//     isActive: true,
//     state: 'exited',
//     timestamp: '2020-06-02T13:21:51.716Z',
//     isDisabled: false
//   }
// ]
```
