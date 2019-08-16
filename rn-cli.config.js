const blacklist = require('metro/src/blacklist')

module.exports = {
  getBlacklistRE () {
    return blacklist([/\/youi\/build\/.*/])
  },
}

