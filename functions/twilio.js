const twilio = require('twilio')
const keys = require('../config/keys')

module.exports = new twilio.Twilio(keys.twilioSID, keys.twilioAuthToken)
