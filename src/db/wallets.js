module.exports = require('nedb-promise')({
  // these options are passed through to nedb.Datastore
  filename: 'wallets.json',
  autoload: true // so that we don't have to call loadDatabase()
})