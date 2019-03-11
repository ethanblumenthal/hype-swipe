const admin = require('firebase-admin')
const functions = require('firebase-functions')
const serviceAccount = require('./service_account.json')
const createUser = require('./create_user')
const requestPassword = require('./request_password')
const verifyPassword = require('./verify_password')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-21595.firebaseio.com"
})

exports.createUser = functions.https.onRequest(createUser)
exports.requestPassword = functions.https.onRequest(requestPassword)
exports.verifyPassword = functions.https.onRequest(verifyPassword)
