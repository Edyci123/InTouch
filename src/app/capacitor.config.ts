import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-app-base',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "BarcodeScanner": {
      "ios": {
        "cameraUsageDescription": "The app needs to access the camera to scan barcodes."
      }
    }
  }
};

export default config;
