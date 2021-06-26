const express = require("express")
const path = require('path')
const {rightNow} = require('./date.js')
const _ = require('lodash')
//require env
//require('dotenv').config({ path: './config/dev.env'})
require('dotenv').config({ path: './config/test.env'})

require('./db/mongoDB.js')



const app = express()
app.set('view engine', 'ejs') // this looks for the file in root/views/

const port = process.env.PORT
//console.log(__dirname)

app.use(express.urlencoded( { extended: true } ))

//specify static folder 'public' //absolute dir
const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))

//

//console.log(rightNow())

const { Item } = require('./itemModel')
const { List } = require("./listModel.js")


app.get('/' , (req, res) => {
    let currentDate = rightNow()
    
    
    Item.find({}, (error, result) => {
        if(error){
            console.log(error)
            
        }else{
            //console.log(result, typeof(result))
            
            res.render('list.ejs', { 
                myListName: 'main',
                listItem: result
            })
        }        
    })
    

})


app.post('/', (req, res) => {
    const newItem = (req.body.newTask)
    const listName = req.body.list
    console.log(req.body)
    
    const newPost = new Item ({
        name: newItem
    })

    if(listName == 'main'){
        Item.insertMany(newPost, (error, docs) => {
            if(error){
                console.log(error)
            }
            else{
                console.log('inserted new value')
                res.redirect('/')
            }
        })
    }
    else{
        
        List.findOne( { name: listName } , (err, foundList) => {
            if(!err){
                if(!foundList){
                    console.log('list not existing')
                }
                else{
                    console.log('exists')
                    console.log(foundList)
                    foundList.items.push(newPost)
                    foundList.save()
                    res.redirect(`lists/${listName}`)
                    
                }
            }
    
        })
    }
           
    
    

})

app.post('/deletePost', async (req, res) => {
    //console.log(req.body, typeof(req.body))
    const checkedItemId = req.body.checkbox
    const listName = req.body.listName

    if(listName == 'main'){
        try {
            await Item.findByIdAndDelete({_id: checkedItemId})
            console.log(`entry deleted`)
            res.redirect('/')
            
        } catch (error) {
            console.log(error)
        }
    }
    else{
        List.findOneAndUpdate( { name:listName }, { $pull: {items: { _id: checkedItemId} }} , (error, foundList) => {
            if(!error){
                res.redirect(`lists/${listName}`)
                console.log('deleted entry')
            }
            else{
                console.log(error)
            }
        })
    }

   
    
})

const post1 = new Item ({
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
]

app.get('/lists/:listName', (req, res) => {
    //console.log(req.params)
    const listName = _.capitalize(req.params.listName)

    List.findOne( { name: listName } , (err, foundList) => {
        if(!err){
            if(!foundList){
                console.log('list not existing')
                const list = new List({
                    name: listName,
                    items: defaultPost
                })
                list.save()
                res.redirect(`lists/${listName}`  )
            }
            else{
                console.log('exists')
                res.render('list.ejs', { 
                    myListName: `${foundList.name}`,
                    listItem: foundList.items
                })
            }
        }

    })
})


//  in ejs
// <ul id="myList">
//       <% for (let i=0; i<listItem.length; i++) { %>
//       <li><%=listItem[i]%></li>
//       <% } %>
//     </ul>


// <% for (let i=0; i<listItem.length; i++) { %>
//     <li class="list-group-item"><%= listItem[i].name %></li>
//     <% } %>


app.listen( port , () => {
    console.log('now serving on port: ' + port)
    //console.log(publicDirectoryPath)
})