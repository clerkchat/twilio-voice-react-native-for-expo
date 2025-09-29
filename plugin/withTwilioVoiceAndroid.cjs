const { AndroidConfig, withAndroidManifest } = require('@expo/config-plugins');

function withTwilioVoiceAndroid(config) {
  // Add required permissions
  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.RECORD_AUDIO',
    'android.permission.MODIFY_AUDIO_SETTINGS',
    'android.permission.ACCESS_NETWORK_STATE',
    'android.permission.ACCESS_WIFI_STATE',
    'android.permission.BLUETOOTH',
    'android.permission.BLUETOOTH_CONNECT',
    'android.permission.FOREGROUND_SERVICE',
    'android.permission.FOREGROUND_SERVICE_MICROPHONE',
    'android.permission.FOREGROUND_SERVICE_PHONE_CALL',
    'android.permission.POST_NOTIFICATIONS',
    'android.permission.USE_FULL_SCREEN_INTENT',
    'android.permission.VIBRATE',
    'android.permission.WAKE_LOCK',
  ]);

  // Add services to AndroidManifest.xml
  config = withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;
    const mainApplication =
      AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);

    // Add VoiceFirebaseMessagingService
    if (
      !mainApplication.service?.some(
        (service) =>
          service.$?.['android:name'] ===
          'com.twiliovoicereactnative.VoiceFirebaseMessagingService'
      )
    ) {
      if (!mainApplication.service) {
        mainApplication.service = [];
      }

      mainApplication.service.push({
        '$': {
          'android:name':
            'com.twiliovoicereactnative.VoiceFirebaseMessagingService',
          'android:exported': 'false',
        },
        'intent-filter': [
          {
            action: [
              {
                $: {
                  'android:name': 'com.google.firebase.MESSAGING_EVENT',
                },
              },
            ],
          },
        ],
      });
    }

    // Add VoiceService
    if (
      !mainApplication.service?.some(
        (service) =>
          service.$?.['android:name'] ===
          'com.twiliovoicereactnative.VoiceService'
      )
    ) {
      if (!mainApplication.service) {
        mainApplication.service = [];
      }

      mainApplication.service.push({
        $: {
          'android:name': 'com.twiliovoicereactnative.VoiceService',
          'android:exported': 'false',
          'android:stopWithTask': 'false',
          'android:foregroundServiceType': 'phoneCall',
        },
      });
    }

    return config;
  });

  return config;
}

module.exports = withTwilioVoiceAndroid;
