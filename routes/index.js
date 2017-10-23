var express = require('express');
var router = express.Router();
var db = require('../db');
var uuid = require('../uuid');

/* GET home page. */
router.get('/', function(req, res, next) {

  var urltoken = req.baseUrl.split("/")[1]

  if (!urltoken){
    res.render('index');
    return;
  }

  var urlid    = uuid.decode(urltoken)

  db.query( { where: {'id': urlid }, orWhere: { 'alias': urltoken} })
  .fetch().then(function(url){
    if (url){
      var obj = url.toJSON();
      res.writeHead(301, {
        'Location': obj.url,
        'Cache-Control': 'no-cache'
      });
      res.end();

      // update visit_count value
      url.set("visit_count", obj.visit_count+1 ).save();

    }
    else {
      res.status(404).render('index');
    }
  })

});

module.exports = router;
