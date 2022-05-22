const Router = require('express')
const router = new Router()
const musicController = require('../controllers/musicController')

router.post('/add', musicController.add)
router.get('/getAll', musicController.getAll)

module.exports = router
