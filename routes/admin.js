var express = require('express');
var router = express.Router();
var db = require('../db');
var uuid = require('../uuid');
var moment = require('moment')

/* UI Page overview listing. */
router.get('/', function(req, res, next) {
  res.render('admin')
});


/* new url page */
router.get('/new', function(req, res, next) {
  res.render('new');
});


/* check if alias/ID allready exists */
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


/* Create a new URL */
router.post('/api/new', function(req, res, next) {

  try {
    var mstr = req.body.exp_date + " 23:59"
    var exp_date = moment(mstr, moment.ISO_8601);
    var exp_datetime = exp_date.toISOString();
  }
  catch(err) {
    var exp_datetime=null;
  }

  new db({
    url: req.body.url,
    alias: req.body.alias,
    visit_count: 0,
    exp_date: exp_datetime
  }).save().then(function(url) {
    var resp = url.toJSON();
    resp.uuid = uuid.encode(resp.id)
    res.json(resp);
  })

});



router.get("/api/list", function(req, res, next ){
  db.fetchAll().then(function(data){
    var resp = []
    var raw = data.toJSON();
    for (item of raw){
      item.uuid = uuid.encode(item.id);
      resp.push(item);
    }
    res.json(resp);
  });
});


/* delete an URL */
router.post('/api/delete', function(req, res, next) {
  db.where('id', req.body.item_id).fetch().then(function(item){
    if (item){
      item.destroy();
      res.json({ 'status': 'ok' });
    }
    else {
      res.json({ 'status': 'notfound' });
    }
  });
});


module.exports = router;
