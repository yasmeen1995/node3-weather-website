const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoieWFzbWVlbnNoYWlrIiwiYSI6ImNrOTR6MzVwYTA3YXUzbXAyaGM2Mm02MXgifQ.HMDnYOvllpRxJnFBJHdrcw&limit=1'

    request({ url, json: true}, (error, { body }) => { //response obj replaced with body property due to destruction
        if (error) {
            callback('Unable to connect to local services!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find loaction.Try another search', undefined)
        } else {
            callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
            })   
        }
    })
}


module.exports = geocode



// //Print the latitude and longitude
// const GeocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoieWFzbWVlbnNoYWlrIiwiYSI6ImNrOTR6MzVwYTA3YXUzbXAyaGM2Mm02MXgifQ.HMDnYOvllpRxJnFBJHdrcw&limit=1'
// // messed up URL:'https://api.mapbox.com/geocoding/v5/mapbox.places/whatsuphere.json?access_token=pk.eyJ1IjoieWFzbWVlbnNoYWlrIiwiYSI6ImNrOTR6MzVwYTA3YXUzbXAyaGM2Mm02MXgifQ.HMDnYOvllpRxJnFBJHdrcw&limit=1'

// request({url:GeocodeUrl, json: true}, (error, response) => {
//     if (error){
//         console.log('Unable to connect browser!')
//     } else if ( (response.body.features).length ===0) {
//         console.log ('Requested page did not find,Please check!!')
//     } else {
//     console.log('latitude: '+response.body.features[0].center[1]+' and longitude: '+response.body.features[0].center[0])
//     }
// })





