const withTwilioVoiceIos = require('./withTwilioVoiceIos.cjs');
const withTwilioVoiceAndroid = require('./withTwilioVoiceAndroid.cjs');

function withTwilioVoice(config) {
  config = withTwilioVoiceIos(config);
  config = withTwilioVoiceAndroid(config);
  return config;
}

module.exports = withTwilioVoice;