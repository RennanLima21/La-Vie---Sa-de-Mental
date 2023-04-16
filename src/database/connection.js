const Sequelize = require("sequelize");

const DB_NAME = "mydb";
const DB_USER = "root";
const DB_PASS = ""; // senha do MySql
const DB_CONFIG = {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
};

let db = {};

try {
  db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
  console.error("Error ao tentar uma conexão com banco dados");
}

async function hasConnection() {
  try {
    await db.authenticate();
    console.log("Banco dados conectado");
  } catch (error) {
    console.error(error);
  }
}

Object.assign(db, {
  hasConnection,
});

module.exports = db;