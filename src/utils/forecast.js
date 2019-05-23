const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/eece9c6aac2c80faac3a537f0f704116/'+latitude+','+longitude+'?units=si&lang=pt'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)            
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability                
            })            
        }
    })    
}

module.exports = forecast