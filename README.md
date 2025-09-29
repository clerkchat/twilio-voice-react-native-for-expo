# Twilio Voice React Native SDK - Expo Edition
[![NPM](https://img.shields.io/npm/v/%40ashworthhub/twilio-voice-expo.svg?color=blue)](https://www.npmjs.com/package/%40ashworthhub/twilio-voice-expo)

Twilio's Voice React Native SDK with full Expo support (SDK 53 compatible). Allows you to add real-time voice and PSTN calling to your React Native and Expo apps.

## Key Features
- ✅ **Expo SDK 53 Compatible**
- ✅ **React Native 0.76.5**
- ✅ **New Architecture Support**
- ✅ **Automatic Configuration via Expo Plugins**
- ✅ **TypeScript 5.3+**

- [Documentation](https://www.twilio.com/docs/voice/sdks/react-native)
- [API Reference](https://github.com/twilio/twilio-voice-react-native/blob/latest/docs/api/voice-react-native-sdk.md)
- [Reference App](https://github.com/twilio/twilio-voice-react-native-app)

Please check out the following if you are new to Twilio's Programmable Voice or React Native.

- [Programmable Voice](https://www.twilio.com/docs/voice/sdks)
- [React Native](https://reactnative.dev/docs/getting-started)

## Installation
The package is available through [npm](https://www.npmjs.com/package/@ashworthhub/twilio-voice-expo).

```sh
npm install @ashworthhub/twilio-voice-expo
# or
yarn add @ashworthhub/twilio-voice-expo
```

### Expo Configuration
Add the plugin to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "@ashworthhub/twilio-voice-expo"
    ]
  }
}
```

### Android Requirements

Add the following to your `android/gradle.properties`:

```properties
android.useAndroidX=true
android.enableJetifier=true
```

**Note:** The VoiceApplicationProxy auto-initializes when the module is loaded, so no manual MainApplication.kt modifications are needed.

Once the package has been installed to your React Native application, there are further steps that you will need to take for both iOS and Android platforms. Please see the supporting documentation below.

## Supporting Documentation

### Getting Started

#### iOS
Learn how to get started for the [iOS platform](/docs/getting-started-ios.md).

#### Android
Learn how to get started for the Android platform if you are using [Java](/docs/getting-started-android-java.md) or [Kotlin](/docs/getting-started-android-kotlin.md).

### Migration Guide
If you are migrating from a version of the Twilio Voice React Native SDK `< 1.0.0.beta.4` to a version `>= 1.0.0.beta.4`, please see [this](/docs/migration-guide-beta.4.md) document.

### Customizing Notifications
To customize the appearance and content of your application's notifications, please see [this](/docs/customize-notifications.md) document.

### Outgoing Call Ringback Tone
To enable your application to play a ringback tone while making an outgoing call, please see [this](/docs/play-outgoing-call-ringback-tone.md) document.

### Out-of-band PushKit Handling
To have your application implement or use its own `PushKit` delegate module, please see [this](/docs/applications-own-pushkit-handler.md) document.

### Out-of-band Firebase Messaging Service
To have your application implement or use a different `FirebaseMessagingService` (such as OneSignal or RNFirebase), please see [this](/docs/out-of-band-firebase-messaging-service.md) document.

## Issues and Support
Please check out our [common issues](/COMMON_ISSUES.md) page or file any issues you find here on Github. For general inquiries related to the Voice SDK you can file a support ticket.

Please ensure that you are not sharing any [Personally Identifiable Information(PII)](https://www.twilio.com/docs/glossary/what-is-personally-identifiable-information-pii) or sensitive account information (API keys, credentials, etc.) when reporting an issue.

Please check out our [known issues](/KNOWN_ISSUES.md) for known bugs and workarounds.

## Related
- [Reference App](https://github.com/twilio/twilio-voice-react-native-app)
- [Twilio Voice JS](https://github.com/twilio/twilio-voice.js)
- [Twilio Voice iOS](https://github.com/twilio/voice-quickstart-ios)
- [Twilio Voice Android](https://github.com/twilio/voice-quickstart-android)

## License
See [LICENSE](/LICENSE)
