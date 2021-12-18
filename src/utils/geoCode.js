const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFwdXNlci0yNDU2IiwiYSI6ImNrd3I4MzJkcDAxOWEyeW1ocTdxb25hY2IifQ.vLPeWBp90X47wxol2exA9A&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('check your network connection', undefined)
        } else if (body.features.length === 0) {
            callback('there is some input error, unable to find location, please provide correct placeName', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode