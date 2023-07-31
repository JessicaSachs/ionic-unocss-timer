import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'timer.vue',
  appName: 'timer-vue',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
