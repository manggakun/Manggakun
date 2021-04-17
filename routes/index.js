var express = require('express');
var router = express.Router();
/* bind with database. */
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/k101', function(req, res, next) {
  res.render('index', { title: 'Yowes' });
});

// connect to database postgres
const conn = new pg.Pool({user: 'postgres', host: 'localhost', database: 'manggakun', password: 'sudo', port: 5432});
router.get('/project', function(req, res, next) {
  conn.query('select * from project', function(err, result) {
    res.render('index', { title: 'Projects', data: result.rows});
  });
});

router.get('/project/json', function(req, res, next) {
  conn.query('select * from project', function(err, result) {
    res.end(JSON.stringify(result.rows));
  });
});

module.exports = router;
