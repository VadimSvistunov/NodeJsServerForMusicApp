const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.patch('/update', userController.update)
router.get('/profile', userController.getProfile)

module.exports = router
