import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './favicon.ico'
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      iconUrl: "https://croomssched.tech/favicon.ico",
      setupExe: "CroomsBellSetup.exe",
      setupIcon: "./installer.ico",
      loadingGif: "./loader.gif",
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({})
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
  ],
};

export default config;