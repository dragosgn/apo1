const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')


const nuxt = require('./nuxt1')
module.exports.nuxt = sls(nuxt, {
  binary: binaryMimeTypes
});

