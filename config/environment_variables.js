const config = require("config");

const database = config.get("database");
const session = config.get("session");
const server = config.get("server");
const email = config.get("email");

const databaseConfig = { connectionString: database.connectionString };
const sessionConfig = { secret: session.secret, ttl: session.ttl };
const serverConfig = { port: server.port };
const emailConfig = {
  host: email.host,
  hostEmail: email.hostEmail,
  password: email.password,
};

module.exports = { databaseConfig, sessionConfig, serverConfig, emailConfig };
