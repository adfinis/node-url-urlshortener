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
    }
    else {
      res.render('index');
    }
  })

});

module.exports = router;
