const router = require('express').Router();
const userAuth = require('../controllers/userAuthCtrl');
const user = require('../controllers/userCtrl');

router.post('/users/register', userAuth.register);
router.post('/users/login', userAuth.login);

router.route('/users')
  .get(user.index);

module.exports = router;
