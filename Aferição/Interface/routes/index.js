var express = require('express');
var router = express.Router();
var env = require('../config/env')
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+'/emd2')
    .then(response => {
      res.render('index', { list: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});


router.get('/emd/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint+'/emd/' + req.params.id)
    .then(response => {
      res.render('emd', { e: response.data, d: data });
    })
    .catch(err => {
      res.render('error', {error: err})
    })
});
module.exports = router;
