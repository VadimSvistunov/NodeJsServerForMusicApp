const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const musicRouter = require('./musicRouter')


router.use('/user', userRouter)
router.use('/music', musicRouter)


module.exports = router
