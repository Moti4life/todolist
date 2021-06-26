
const displayPara = document.querySelector("#myPara")
const newInput = document.querySelector("#nTask")
const addTaskButton = document.querySelector("#addTaskBtn")



let items = []

const addNewTaskLi = () => {
    
    /* let ul = document.querySelector('#myList')
    ul.innerHTML = ''
   
    for( let i = 0; i < items.length; i++){
        let li = document.createElement('li')
        li.setAttribute('id', 'task' + i)
        li.appendChild(document.createTextNode(items[i]))
        ul.appendChild(li)
    } */
    
    
    //surprising yet simple way of doing it    
    /* let fillString = '<ul>'
    items.forEach( (todoItem) => {
        fillString += '<li>' + todoItem + '</li>'
    })
    fillString += '</ul>'
    document.querySelector('#slideContainer').innerHTML = fillString */
    

    // using frag
    let list = document.querySelector('#slideContainer')
    list.innerHTML = ''
    let ul = document.createElement('ul')
    let fragment = document.createDocumentFragment()
    ul.setAttribute('class', 'list-group')

    items.forEach( (item) => {
        let li = document.createElement('li')
        li.textContent = item
        li.setAttribute('id', 'task' + item)
        li.setAttribute('class', 'list-group-item')
        fragment.appendChild(li)
    })
    ul.appendChild(fragment)
    list.appendChild(ul)

    //addTaskButton.removeAttribute('disabled')
}


addTaskButton.addEventListener('click', (event) => {
    event.preventDefault()
    
    //addTaskButton.setAttribute('disabled', 'disabled')
    let newItem = (newInput.value)
    items.push(newItem)
    displayPara.textContent = items + items.length
    
    addNewTaskLi()
    newInput.value = ''
})