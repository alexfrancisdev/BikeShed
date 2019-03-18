const router = require('express').Router()

const user = require('../controllers/userCtrl')
const userAuth = require('../controllers/userAuthCtrl')

const mechanic = require('../controllers/mechanicCtrl')
const mechanicAuth = require('../controllers/mechanicAuthCtrl')

const secureRoute = require('../lib/secureRoute')

const service = require('../controllers/serviceCtrl')

//User
router.post('/user/register', userAuth.register)
router.post('/user/login', userAuth.login)

router.route('/user')
  .get(user.index)

//Mechanic
router.post('/mechanic/register', mechanicAuth.register)
router.post('/mechanic/login', mechanicAuth.login)
router.route('/mechanic/:id')
  .get(mechanic.show)

router.route('/mechanic')
  .get(mechanic.index)

//Services
router.get('/services', service.index)
router.post('/services/new', secureRoute.mechanic, service.create)
router.route('/services/:id')
  .get(service.show)
  .put(service.update)
  .delete(service.delete)

module.exports = router
