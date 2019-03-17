const router = require('express').Router()

const user = require('../controllers/userCtrl')
const userAuth = require('../controllers/userAuthCtrl')

const mechanic = require('../controllers/mechanicCtrl')
const mechanicAuth = require('../controllers/mechanicAuthCtrl')

const service = require('../controllers/serviceCtrl')

//User
router.post('/user/register', userAuth.register)
router.post('/user/login', userAuth.login)

router.route('/user')
  .get(user.index)

//Mechanic
router.post('/mechanic/register', mechanicAuth.register)
router.post('/mechanic/login', mechanicAuth.login)

router.route('/mechanic')
  .get(mechanic.index)

//Services
router.get('/services/', service.index)
router.post('/services/create', service.create)
router.get('services/:id', service.show)

module.exports = router
