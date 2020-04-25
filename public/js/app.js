console.log('Client side Javascript file isloaded!')

//  this functn will kick off IO Asynchroous operation
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) 


// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {   
//             console.log(data)
//         } else {
//             console.log('location: ',data.location)
//             console.log('Forecast: ',data.forecastData)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1') // # to access ID value 
const messageTwo= document.querySelector('#message-2')

// messageOne.textContent = 'FromJavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value   // tohold the searched values from page
    
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    
    // fetch('http://localhost:3000/weather?address='+location).then((response) => {
    fetch('/weather?address='+location).then((response) => {  //changes for heroku
    response.json().then((data) => {
        if(data.error) {   
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
            
        }
    })
})

})

