var express = require('express');
var router = express.Router();
/* bind with database. */
var pg = require('pg');

// connect to database postgres
require('dotenv').config()
const conn = new pg.Pool({user: process.env.DB_USER, host: process.env.DB_HOST, database: process.env.DB_DATA, password: process.env.DB_PASS, port: process.env.DB_PORT});

/* GET home page. */
router.get('/', function(req, res, next) {
  conn.query('select * from article', function(err, result) {
    res.render('index', { data: result.rows});
  });
});

router.get('/k101', function(req, res, next) {
  res.render('index', { title: 'Yowes' });
});

router.get('/project', function(req, res, next) {
  conn.query('select * from project', function(err, result) {
    res.render('project', { title: 'Projects', data: result.rows});
  });
});

router.get('/project/json', function(req, res, next) {
  conn.query('select * from project', function(err, result) {
    res.end(JSON.stringify(result.rows));
  });
});

router.get('/kthings', function(req, res, next) {
  res.render('kthings', { title: 'K-Things' });
});

router.get('/blog', function(req, res, next) {
  res.render('blog', { title: 'Blogs' });
});

module.exports = router;
