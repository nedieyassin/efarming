import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.esinta.efarming',
  appName: 'efarming',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
