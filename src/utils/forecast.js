const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=0567ee97e9d41d0b525b61d8e4e01c0f&query='+latitude+','+longitude+'&units=f'   

    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!!', undefined)
        } else if (body.error) {
            callback(undefined, 'Unable to find location!!')
        } else {
            callback (undefined, 
                body.location.weather_descriptions[0] +'. It is Currently : '+body.current.temperature + ' degress out. It feels like '
                +body.current.feelslike +'% degress out. '+ 'The humidity is: '+ body.current.humidity+' !!!'
                )
        }

    })
}

module.exports = forecast




// // const url = 'http://api.weatherstack.com/current?access_key=0567ee97e9d41d0b525b61d8e4e01c0f&query=37.8267,-122.4233&units=f'
// request({url:url, json: true }, (error, response) => {
//     if (error){
//         console.log('Unable to connect to weather service!!')
//     } else if (response.body.error) {
//         console.log('Unable to find locatin')
//     } else {
//         console.log(response.body.current.weather_descriptions[0],'. It is Currently ',response.body.current.temperature,' degree out. There is a ',response.body.current.feelslike,'% chance of rain.')
// } 
// })
