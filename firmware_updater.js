#!/usr/bin/env node

const { program } = require('commander')
const q = require('q')
const device_curator = require('ljswitchboard-ljm_device_curator')
const labjack_nodejs = require('labjack-nodejs')
const ljm = labjack_nodejs.driver()

// The globally-scoped instance
let updateInst

class DeviceUpdater {
    constructor(opts) {
        this.dt = opts.deviceType
        this.ct = opts.connectionType
        this.id = opts.identifier
        this.fwFile = opts.file
        this.dryRun = opts.dryRun

        this.device = new device_curator.device()
        this.debug = false
    }

    destroy() {
        this.device.destroy()
    }

    displayErrorAndQuit(err) {
        if (this.debug === true) {
            console.error(err)
        }
        else {
            if (typeof err.message !== 'undefined') {
                console.error(err.message)
            }
            else {
                console.error(err)
            }
        }
    }

    openDevice() {
        let deferred = q.defer()

        console.log(
            "Open parameters :",
            this.dt,
            this.ct,
            this.id
        )

        this.device.open(this.dt, this.ct, this.id)
        .then((res) => {
            console.log(
                "Opened :",
                res.productType,
                res.connectionTypeName,
                res.serialNumber
            )
            deferred.resolve(res)
        }, (err) => {
            deferred.reject(new Error(`Failed for testing: ${ljm.errToStrSync(err)}`))
        })
        return deferred.promise
    }

    updateFirmware() {
        if (this.dryRun) {
            console.log('Dry run: Skipping firmware update.')
            return
        }

        console.log('Now updating to firmware file:', this.fwFile)
        var percentListener = (/*value*/) => {
            var deferred = q.defer()
            // console.log("", value.toString() + '%')
            deferred.resolve()
            return deferred.promise
        }
        var stepListener = (value) => {
            var deferred = q.defer()
            console.log("" + value.toString())
            deferred.resolve()
            return deferred.promise
        }

        return this.device.updateFirmware(this.fwFile, percentListener, stepListener)
    }

    printFWInfo() {
        return this.device.iRead('FIRMWARE_VERSION')
        .then((fwVer) => {
            console.log(`Current firmware version: ${fwVer.val}`)
        })
    }

    closeDevice() {
        return this.device.close()
    }
}

function main() {
    program
        .option(
            '-d, --device-type <deviceType>',
            'The LabJack device type. E.g.: T4, T7, ANY',
            'ANY',
        )
        .option(
            '-c, --connection-type <connectionType>',
            'The connection type to be used to connect to the device. E.g.: USB, ETHERNET, WIFI, ANY',
            'ANY',
        )
        .requiredOption(
            '-i, --identifier <identifier>',
            '(Required) A device\'s serial number, IP address, name, or ANY. E.g.: 470010835, 192.168.1.207, My-HVAC-Lab-DAQ, ANY',
        )
        .requiredOption(
            '-f, --file <file>',
            '(Required) The LabJack firmware file path. E.g.: /home/me/Downloads/T7firmware_010292_2020-02-04_0.bin, C:\\Users\\me\\Downloads\\T7firmware_010292_2020-02-04_0.bin',
        )
        // .option(
        //     '-q, --quiet',
        //     'Avoid producing any stdout output. Still produces stderr output.',
        //     false,
        // )
        .option(
            '-n, --dry-run',
            'Open a device and read the firmware version without updating firmware. File parameter is still required but will not be read.',
            false,
        )

    program.parse()

    updateInst = new DeviceUpdater(program.opts())
    updateInst.openDevice()
    .then(() => { return updateInst.printFWInfo() })
    .then(() => { return updateInst.updateFirmware() })
    .then(() => { return updateInst.printFWInfo() })
    .then(() => { return updateInst.closeDevice() })
    .catch((err) => { return updateInst.displayErrorAndQuit(err) })
    .finally(() => { return updateInst.destroy() })
}

main()
