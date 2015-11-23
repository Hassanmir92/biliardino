var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var usersController = require('../controllers/usersController');
var clubsController = require('../controllers/clubsController');
var authenticationsController = require('../controllers/authenticationsController');

// Authentication routes
router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

// User routes
router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

// Club routes
router.route('/clubs')
  .get(clubsController.clubsIndex)
  .post(clubsController.clubsPost)

router.route('/clubs/:id')
  .get(clubsController.clubsShow)
  .put(clubsController.clubsUpdate)
  .delete(clubsController.clubsDelete)

router.route('/clubs/:id/vote')
  .patch(clubsController.clubsAddVote)

module.exports = router;








