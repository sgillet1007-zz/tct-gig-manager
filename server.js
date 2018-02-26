'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var pool = require('./sql_db/index.js');

var app = express();
var router = express.Router();

var port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/gigs')
  .get(function(req, res) {
    pool.query('SELECT * FROM gigs', function(err, respR) {
      if (err) {
        return err;
      } else {
        res.json(respR.rows);
      }
    });
  })
  .post(function(req, res) {
    const { loc_venue, gig_date } = req.body; 
    pool.query(
      'INSERT INTO gigs(loc_venue, gig_date) VALUES($1, $2)',
      [loc_venue, gig_date],
      function(err, respC) {
        if (err) {
          return err;
        }
        res.redirect('/gigs');
      }
    );
  });

router.route('/gigs/:id')
  .put(function(req, res) {
    const { id } = req.params;
    const keys = ['loc_venue', 'gig_date'];
    const fields = [];

    keys.forEach(key => {
      if (req.body[key]) {
        fields.push(key);
      }
    });

    fields.forEach((field, index) => {
      pool.query(
        `UPDATE gigs SET ${field}=($1) WHERE id=($2)`, 
        [req.body[field], id],
        function(err, respU) {
          if (err) {
            return err;
          } else if (index === fields.length -1) {
            res.redirect('/gigs');
          }
        }
      );
    });
  })
  .delete(function(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM gigs WHERE id=($1)', [id], function(err, respD){
      if (err) {
        return err;
      }
      res.redirect('/gigs');
    });
  });

  // TODO - ADD Routes for Setlist
  // router.route('/setlist/:id')
  //   .put()
  //   .

app.use('/api', router);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
