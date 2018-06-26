const settings = require("./settings_knex");

const knex = require('knex')({
  client   : settings.client,
  connection: {
    user     : settings.connection.user,
    password : settings.connection.password,
    database : settings.connection.database,
    host     : settings.connection.host,
  }
});

const argFName = process.argv[2];
const argLName = process.argv[3];
const argDate = process.argv[4];

knex('famous_people').insert({
  first_name: argFName,
  last_name: argLName,
  birthdate: argDate
}).returning('*').asCallback(function(err, rows) {
  if (err) return console.error(err)
    console.log(rows)
  return knex.destroy();
})







