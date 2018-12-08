const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json');

function add_quote() {
  db.get('posts')
    .push({ id: 1, title: 'lowdb is awesome' })
    .write()
}
function init_db() {
  console.log('I am called');
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