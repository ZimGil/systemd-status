# systemd-status

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2bbd78b16de14b02ae775996de83a829)](https://app.codacy.com/manual/ZimGil/systemd-status?utm_source=github.com&utm_medium=referral&utm_content=ZimGil/systemd-status&utm_campaign=Badge_Grade_Settings)

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
//   },
// ]
```
