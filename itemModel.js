const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema ({
    name: {
        type: String
    }
})

const Item = mongoose.model('Items', itemSchema)

/* const post1 = new Item ({
    name: 'bath'
})

const post2 = new Item ({
    name: 'eat'
})


const post3 = new Item ({
    name: 'learn'
})

const defaultPost = [
    post1,
    post2,
    post3
] */

// Item.insertMany(defaultPost, (error, docs) => {
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log('inserted default value')
//     }
// })


module.exports = {Item, itemSchema}


