const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=34e1e98a97cf4f099991836d0aec2040&query=' + lat + ',' + long + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('check your internet/wifi connection', undefined)
        } else if (body.error, undefined) {
            callback('Invalid lat long value')
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees out. There is a ${body.current.precip} chance of rain`)
        }
    })
}

module.exports = forecast