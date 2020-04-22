# t_series_firmware_updater

A firmware updater for T-series LabJack devices. Cross-platform. Includes functionality to build a distributable executable.


## Requirements

Requires ES6. Written / tested with Node v10.2.1.


## Setup

### For local usage:

```
cd t_series_firmware_updater
npm install
```

### For distribution:

Same as setting up for local usage, but pkg must also be installed:

```
npm install -g pkg
```


## Building a firmware updater for distributable

Currently a build for a particular platform must be performed on that platform.

Example:

```
cd t_series_firmware_updater
mkdir output/
pkg --target node10-linux-x64   ./package.json --output ./output/labjack-firmware-updater-node10-linux-x64
```


## Firmware updater usage

`node firmware_updater.js` usage is the same as for the resulting executables.


### Examples:

For usage:

```
./output/labjack-firmware-updater-node10-linux-x64 [options]
```

Which is the same as:

```
node ./firmware_updater.js [options]
```

See also: [`usage.md`](usage.md).
