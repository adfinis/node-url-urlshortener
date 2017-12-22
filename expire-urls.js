var db = require("./db");
var moment = require("moment");

var expire_urls = function() {
  db.fetchAll().then(function(data) {
    var rows = data.toJSON();
    var now = moment.utc();
    var del_ids = [];

    for (item of rows) {
      var exp_date = moment.utc(item.exp_date);
      // null in database
      if (exp_date.unix() == 0) {
        continue;
      }

      // if diff is bigger than 0 we need to expire it
      if (now.diff(exp_date) > 0) {
        console.log(item);
        del_ids.push(item.id);
      }
    }

    // delete collected items
    if (del_ids) {
      db
        .where("id", "in", del_ids)
        .destroy()
        .then(function(items) {
          process.exit();
        });
    }
  });
};

module.exports = expire_urls;
