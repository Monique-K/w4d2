const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const args = process.argv[2];

function lookupPeople(name, cb) {
  const query = `SELECT * FROM famous_people WHERE first_name = '${name}' OR last_name = '${name}'`
  client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    formatRes(result)
    client.end();
  });
 });
}

function formatRes(result) {
  const num = result.rows.length
  console.log(`Found ${num} person(s) by the name '${args}': \n`);
  for (let i = 0; i < num; i ++) {
    formatDate(result.rows[i])
    console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${birthDate}`)
  }
}

function formatDate(row) {
  const badDate = row.birthdate
  let year = badDate.getFullYear()
  let month = badDate.getMonth() + 1
  if (month < 10) {
    month = "0" + month;
  }
  let day = badDate.getDate()
  if (day < 10) {
    day = "0" + day;
  }
  birthDate = `${year}-${month}-${day}`
  return birthDate
}

lookupPeople(args);

