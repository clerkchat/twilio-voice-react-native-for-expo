const {
  withEntitlementsPlist,
  withInfoPlist,
  withDangerousMod,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function ensureBackgroundModes(existing = [], required = []) {
  const set = new Set([...existing, ...required]);
  return Array.from(set);
}

module.exports = function withTwilioVoiceIos(config) {
  config = withEntitlementsPlist(config, (c) => {
    c.modResults['aps-environment'] = 'production'; // TODO: make configurable if needed
    return c;
  });

  config = withInfoPlist(config, (c) => {
    c.modResults.UIBackgroundModes = ensureBackgroundModes(
      c.modResults.UIBackgroundModes,
      ['voip', 'audio']
    );
    c.modResults.NSMicrophoneUsageDescription =
      c.modResults.NSMicrophoneUsageDescription ||
      'SimpleVox needs microphone access to make and receive business calls.';
    return c;
  });

  config = withDangerousMod(config, [
    'ios',
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf-8');

      const podLine = `pod 'TwilioVoice', '~> 6.2'`;
      if (!contents.includes(podLine)) {
        contents = contents.replace(
          /use_expo_modules!/,
          `use_expo_modules!\n  ${podLine}`
        );
        fs.writeFileSync(podfilePath, contents);
      }

      return config;
    },
  ]);

  return config;
};
