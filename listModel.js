const mongoose = require('mongoose')
const {itemSchema} = require('./itemModel')



const listSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    items: [itemSchema]
})

const List = mongoose.model('Lists', listSchema)

module.exports = {
    List
}
