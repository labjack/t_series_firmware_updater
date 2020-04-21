# t_series_firmware_updater

Creates a firmware updater (command-line executable) for T-series LabJack devices. Cross-platform.

Uses `ljswitchboard-ljm_device_curator` and `pkg`.


## Requirements

Requires ES6. Written / tested with Node v10.2.1.

WIP: Was run on a 64-bit system for 64-bit distributions, was run on armv7 for armv7 distribution.


## Setup

```
cd t_series_firmware_updater
npm install
npm install -g pkg
```


## Create firmware updater

```
cd t_series_firmware_updater
mkdir output/
pkg --target node10-linux-x64   ./firmware_updater.js --output ./output/labjack-firmware-updater-node10-linux-x64
pkg --target node10-macos-x64   ./firmware_updater.js --output ./output/labjack-firmware-updater-node10-macos-x64
pkg --target node10-win-x64     ./firmware_updater.js --output ./output/labjack-firmware-updater-node10-win-x64
```

For a given platform, pkg [apparently needs both the native node binary and the target node binary](https://github.com/zeit/pkg/issues/869). There's [no 32-bit or arm node binaries for macOS](https://github.com/zeit/pkg-fetch/releases/), so I had to run the following on macOS, which [creates an executable that includes the script source](https://github.com/zeit/pkg-fetch/issues/68#issuecomment-511656541):

```
pkg --target node10-linux-x86   ./firmware_updater.js --output ./output/labjack-firmware-updater-node10-linux-x86 --no-bytecode --public --public-packages '*'
pkg --target node10-linux-armv7 ./firmware_updater.js --output ./output/labjack-firmware-updater-node10-linux-armv7 --no-bytecode --public --public-packages '*'
```


## Firmware updater usage

`node firmware_updater.js` usage is the same as for the resulting binaries in `output/`.


### Examples:

For usage:

```
./device-updater.out --help
```

Which is the same as:

```
node ./firmware_updater.js
```

Example updating the 470010835 T7 via USB:

```
node firmware_updater.js -i 470010835 -f ~/Downloads/T7firmware_010292_2020-02-04_0.bin -d t7 -c USB
```
