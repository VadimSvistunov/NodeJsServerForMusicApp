
const uuid = require('uuid')
const path = require('path');
const {Music} = require('../models/models')

class musicController {

    async add(req, res, next) {
        console.log(req)
        const {name, author, genre} = req.body
        const {musicFile} =  req.files
        console.log(musicFile)
        let filePath = uuid.v4() + ".wav"
        console.log("fsdfdasdsfsadsfasdfdsfDDFFASDSDAS: ", filePath)
        musicFile.mv(path.resolve(__dirname, '..', 'static', filePath))
        console.log(musicFile)
        if (!name || !author) {
            return res.status(420).send({ message: "invalid data" })
        }
        const candidate = await Music.findOne({where: {author, name}})
        if (candidate) {
            return res.status(421).send({ message: "such music already exist" });
        }
        const music = await Music.create({author, name, genre, musicFile: filePath})
        return res.send(JSON.stringify({music}));
    }

    async getAll(req, res, next) {
        const musics = await Music.findAll()
        return res.send(JSON.stringify({musics}));
    }

}

module.exports = new musicController()
