const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, firstName, lastName} = req.body
        if (!email || !password) {
            return res.status(420).send({ message: "Incorrect email or password" })
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(421).send({ message: "Email is busy" });
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, firstName, lastName})
        return res.send(JSON.stringify({user}));
    }

    async login(req, res, next) {
    
        const {email, password} = req.body   
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(422).send({ message: "User not registered" })
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(422).send({ message: "Incorrect password"  })
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.send({user, token});
    }

    async update(req, res) {
        const {firstName, lastName} = req.body
        const {email} = jwt.decode(req.headers.authorization.split(" ")[1])
        const user = await User.findOne({where: {email}})
        user.update({"firstName": firstName, "lastName": lastName})
        console.log(user)
        return res.send({user})
    }

    async getProfile(req, res) {
        const {email} = jwt.decode(req.headers.authorization.split(" ")[1])
        const user = await User.findOne({where: {email}})
        return res.send({user})    
    }


}

module.exports = new UserController()
