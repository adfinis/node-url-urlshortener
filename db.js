var knex = require("knex")({
  client: "mariasql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123qwe",
    database: "test", //myslq/pg
    db: "test", //mariadbsql
    charset: "utf8"
  }
});

bookshelf = require("bookshelf")(knex);

module.exports = bookshelf.Model.extend({
  tableName: "urlshortener"
});
