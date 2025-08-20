import { NativeModule, Platform } from './common';

let requireNativeModule: any = null;
let isExpoAvailable = false;

try {
  if (Platform.OS === 'android') {
    const ExpoModulesCore = require('expo-modules-core');
    requireNativeModule = ExpoModulesCore.requireNativeModule;
    isExpoAvailable = true;
  }
} catch (e) {
  console.log('Expo modules not available, using React Native modules');
  isExpoAvailable = false;
}

interface ConnectOptions {
  params?: Record<string, any>;
  customParameters?: Record<string, any>;
}

class TwilioVoiceExpoModule {
  private androidExpoNativeModule =
    Platform.OS === 'android' && isExpoAvailable && requireNativeModule
      ? (() => {
          try {
            return requireNativeModule('TwilioVoiceExpo');
          } catch (e) {
            console.warn('TwilioVoiceExpo native module not found');
            return null;
          }
        })()
      : null;

  async connect(accessToken: string, options: ConnectOptions = {}) {
    const { params = {}, customParameters = {} } = options;

    if (Platform.OS === 'android' && this.androidExpoNativeModule) {
      return this.androidExpoNativeModule.voice_connect(
        accessToken,
        params,
        customParameters
      );
    }
    return NativeModule.voice_connect_ios(
      accessToken,
      params,
      // @ts-ignore
      customParameters
    );
  }

  async disconnect() {
    if (Platform.OS === 'android' && this.androidExpoNativeModule) {
      return this.androidExpoNativeModule.voice_disconnect?.();
    }
    return NativeModule.voice_disconnect_ios?.();
  }

  isExpoEnvironment(): boolean {
    return isExpoAvailable;
  }
}

export const TwilioVoiceExpo = new TwilioVoiceExpoModule();
export default TwilioVoiceExpo;
