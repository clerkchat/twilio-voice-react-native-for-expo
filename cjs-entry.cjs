// cjs-entry.cjs
/**
 * Entry used when Node (Expo 'config-plugins') requires this package.
 * We don't want to load the React-Native runtime code in Node –
 * it would choke on Flow / RN imports – so we export *only* the
 * config-plugin function here.
 */
module.exports = require('./plugin/withTwilioVoiceIos.cjs');
