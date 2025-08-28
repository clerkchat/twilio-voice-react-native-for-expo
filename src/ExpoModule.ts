import { NativeModule, Platform } from './common';
import { requireNativeModule } from 'expo-modules-core';
import { Call } from './Call';
import type { NativeCallInfo } from './type/Call';

interface ConnectOptions {
  params?: Record<string, any>;
  customParameters?: Record<string, any>;
}

class ExpoNativeModule {
  private androidExpoNativeModule =
    Platform.OS === 'android'
      ? (() => {
          try {
            return requireNativeModule('TwilioVoiceExpo');
          } catch (e) {
            console.warn('TwilioVoiceExpo native module not found');
            return null;
          }
        })()
      : null;

  async voice_connect(accessToken: string, options: ConnectOptions = {}) {
    const { params = {}, customParameters = {} } = options;
    let info: NativeCallInfo;
    if (Platform.OS === 'android' && this.androidExpoNativeModule) {
      info = await this.androidExpoNativeModule.voice_connect(
        accessToken,
        params,
        customParameters
      );
    } else if (Platform.OS === 'ios') {
      info = await NativeModule.voice_connect_ios(
        accessToken,
        params,
        // @ts-ignore
        customParameters
      );
    } else {
      throw new Error('Unsupported platform');
    }
    return new Call(info);
  }

  async disconnect() {
    if (Platform.OS === 'android' && this.androidExpoNativeModule) {
      return this.androidExpoNativeModule.voice_disconnect?.();
    }
    return NativeModule.voice_disconnect_ios?.();
  }

  isExpoEnvironment(): boolean {
    return Platform.OS === 'android';
  }
}

export const ExpoModule = new ExpoNativeModule();
export default ExpoModule;
