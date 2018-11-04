const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json');

function init_db() {
  return new Promise((resolve, reject) => {
    low(adapter).then((db) => {
      db.defaults({ quotes: [] })
        .write()
      resolve();
    })
  })
}

function add_quote(data) {
  return new Promise((resolve, reject) => {
    low(adapter).then((db) => {
      db.get('quotes')
        .push(data)
        .write()
    })
    resolve()
  })

}
function filter_data(results) {

}


module.exports = {
  init_db,
  add_quote
}