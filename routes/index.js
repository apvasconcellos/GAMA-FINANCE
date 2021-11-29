const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  let usuario= req.session.user
  res.render('index', { title: 'Gama Finance', usuario });
});

module.exports = router;
