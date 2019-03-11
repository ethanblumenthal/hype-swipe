const twilio = require('twilio')

const accountSid = 'ACe89efca7f2e608e0dd3e4bf521fb5a6a'
const authToken = '49773541572e134816503239d2548276'

module.exports = new twilio.Twilio(accountSid, authToken)
