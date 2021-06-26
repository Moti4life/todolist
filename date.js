

let rightNow = () => {
    let date = new Date()
    let dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit"
    }
    return date.toLocaleDateString('en', dateOptions)
    
}

module.exports = {
    rightNow
}