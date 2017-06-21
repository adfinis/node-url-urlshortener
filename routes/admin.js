var express = require('express');
var router = express.Router();
var db = require('../db');
var uuid = require('../uuid');

/* GET url listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* new url page */
router.get('/new', function(req, res, next) {
  res.render('new');
});



/* check if alias allready exists */
router.get('/api/check/*', function(req, res, next) {
  var str_to_check = req.originalUrl.split("/")[4];
  var id_to_check  = uuid.decode(str_to_check);
  db.query( { where: {'id': id_to_check }, orWhere: { 'alias': str_to_check} })
  .fetch().then(function(url){
    if (url){
      var resp = { 'status': 'exists' };
    }
    else {
      var resp = { 'status': 'free' };
    }
    res.json(resp);
  })
});


/* new url api */
router.post('/api/new', function(req, res, next) {
  new db({
    url: req.body.url,
    alias: req.body.alias,
    visit_count: 0
  }).save().then(function(url) {
    var resp = url.toJSON();
    resp.uuid = uuid.encode(resp.id)
    res.json(resp);
  })
});


router.post('/api/delete', function(req, res, next) {
  res.render('new');
});


module.exports = router;
