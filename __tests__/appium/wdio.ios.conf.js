// wdio.dev.config.js
var merge = require('deepmerge');
var wdioConf = require('./wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
  capabilities: [{
    app: '../../../../allinone/ios/react/ReactTemplateProject/youi/Debug-iphoneos/EPGSample.app',
    automationName: 'YouiEngine',
    deviceName: 'iOS Device',
    platformName: 'ios',
    platformVersion: '<platformVersion>',
    udid: '<udid>',
    xcodeOrgId: '<XcodeOrgId>',
    youiEngineAppAddress: '<DeviceIP>'
  }],

}, { clone: false });
