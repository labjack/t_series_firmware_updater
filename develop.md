
For a given platform, pkg [needs both the native node binary and the target node binary](https://github.com/zeit/pkg/issues/869). There's [no 32-bit or arm node binaries for macOS](https://github.com/zeit/pkg-fetch/releases/), so I had to run the following on macOS, which [creates an executable that includes the script source](https://github.com/zeit/pkg-fetch/issues/68#issuecomment-511656541):

```
pkg --target node10-linux-x86   ./package.json --output ./output/labjack-firmware-updater-node10-linux-x86 --no-bytecode --public --public-packages '*'
pkg --target node10-linux-armv7 ./package.json --output ./output/labjack-firmware-updater-node10-linux-armv7 --no-bytecode --public --public-packages '*'
```

After that, the Addons (platform-dependent) also need to be provided to pkg. See [package.json](../package.json).
