# LabJack T-series Firmware Updater

Update a T-series LabJack device's firmware.


## Requirements

- LJM must be installed: https://labjack.com/support/software/installers/ljm
- `labjack-firmware-updater-node10-linux-armv7` requires the following files to be remain in the same directory as `labjack-firmware-updater-node10-linux-armv7`:
    - `ffi_bindings.node`
    - `binding.node`


## Firmware updater usage

The firmware updater requires the `--identifier` and the `--file` parameters.

For usage:

```
Usage: firmware_updater [options]

Options:
  -d, --device-type <deviceType>          The LabJack device type. E.g.: T4, T7, ANY (default: "ANY")
  -c, --connection-type <connectionType>  The connection type to be used to connect to the device. E.g.: USB, ETHERNET, WIFI, ANY (default: "ANY")
  -i, --identifier <identifier>           (Required) A device's serial number, IP address, name, or ANY. E.g.: 470010835, 192.168.1.207, My-HVAC-Lab-DAQ, ANY
  -f, --file <file>                       (Required) The LabJack firmware file path. E.g.: /home/me/Downloads/T7firmware_010292_2020-02-04_0.bin,
                                          C:\Users\me\Downloads\T7firmware_010292_2020-02-04_0.bin
  -n, --dry-run                           Open a device and read the firmware version without updating firmware. File parameter is still required but will not be read. (default: false)
  -h, --help                              display help for command
```

The `--identifier` provided is passed as the [Identifier Parameter](https://labjack.com/support/software/api/ljm/function-reference/ljmopens/identifier-parameter) of LJM_OpenS.


### Examples:

Example updating the T7 with serial number 470010835 via USB to a local firmware file:

```
./bin/labjack-firmware-updater-node10-linux-armv7 -i 470010835 -f ~/Downloads/T7firmware_010292_2020-02-04_0.bin -d t7 -c USB
```

Similar, but updating by using a URL to specify the firmware file:

```
./bin/labjack-firmware-updater-node10-linux-armv7 -i 470010835 -f https://labjack.com/sites/default/files/firmware/T7firmware_010287_2019-12-06_1.bin
```
