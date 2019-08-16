// wdio.dev.config.js
var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
  capabilities: [{
    app: '../../youi/build_android_Release/project/EPGSample/build/outputs/apk/debug/EPGSample-debug.apk',
    automationName: 'YouiEngine',
    deviceName: 'android-package-release',
    fullReset: true,
    platformName: 'android',
    youiEngineAppAddress: '10.100.90.83'
  }],

}, { clone: false });
