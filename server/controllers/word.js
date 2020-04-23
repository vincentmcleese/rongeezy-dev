const Word = require('../models/Word')

exports.getWords = async (req, res) => {
    const words = await Word.find({ users: {$in: req.user.sub }})
    res.json(words)
}


exports.createWord = async (req, res) => {
    const wordData = req.body
    const userId = req.user.sub
    const word = await Word.findOne({ word: wordData.word.toLowerCase() })

    if (word === null) {
        const newWord = await new Word(wordData)
        newWord.users.push(userId) 
            try {
                await newWord.save()
                return res.json({message: "succesfully saved a new word and added this reference to the user."})
            } catch(err) {
                return res.status(422).send(err)
            }
    }
    
    if (word.users.includes(userId)) {
            await word.users.pull(userId)
        } else {
            await word.users.push(userId)
        }

    await word.save((err, updatedWord) => {
        if (err) {
            return res.status(422).send(err)
        }
        return res.json({message: "succesfully updated this word toggling a reference to the user."})
    })
}
