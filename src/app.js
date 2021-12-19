const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const expressServerApp = express()
const port = process.env.PORT || 2000

expressServerApp.listen(port, () => {
    console.log('Server is Up on port ' + port);
})

// localhost:4000       -> root route
// localhost:4000/help
// expressServerApp.get('', (req, res) => {
// console.log('hi'); // hi will be printed in nodejs terminal but not in dev tool as it is not written in client side js file
//     res.send('Home Page!')
// })

// expressServerApp.get('/help', (req, res) => {
//     res.send('Help Page!')
// })

// // localhost:4000/about
// // localhost:4000/weather

// expressServerApp.get('/about', (req, res) => {
//     res.send('About')
// })

// expressServerApp.get('/weather', (req, res) => {
//     res.send('Weather')
// })

// expressServerApp.get('', (req, res) => {
//     res.send('<h1>Home Page!</h1>')
// })

// expressServerApp.get('/help', (req, res) => {
//     res.send(['Andrew', 'abcde'])
// })

// expressServerApp.get('/help', (req, res) => {
//     res.send({
//         name:'Andrew',
//         age:25
//     })
// })


// while sending the object back to broweser, express server parse it to JSON string

// expressServerApp.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 25
//     }, {
//         name: 'Salena',
//         age: 22
//     }])
// })

// expressServerApp.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// expressServerApp.get('/weather', (req, res) => {
//     res.send({
//         location: 'patna',
//         forecast: 'Its 15 degree out'
//     })
// })

// Use of path - node core module - no need to install
// console.log(__dirname)
// console.log(__filename);
// expressServerApp.get('', (req, res) => {
//     res.send('Home Page!')
// })




// SYNONYMS ROUTE Handler - expressServerApp.get('' and expressServerApp.use(express.static(    ====

// expressServerApp.get('', (req, res) => {
//     res.send('Home Page!')
// })
// given file will be rendered/sent back when browser ask for root route.
// path.join(__dirname, '../..')
// const publicDirectoryPathToBeRendered = path.join(__dirname, '../public')
// expressServerApp.use(express.static(publicDirectoryPathToBeRendered))

// SYNONYMS ROUTE Handler - expressServerApp.get('' and expressServerApp.use(express.static(    ====


// server serving up dynamic Pages ==============================

// DEfine Paths for express config
// const publicStaticDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates')

// // setUp or Use Static Directory to serve
// expressServerApp.use(express.static(publicStaticDirectoryPath))

// // SetUp Handlebars Engine and views Location
// expressServerApp.set('view engine', 'hbs')
// expressServerApp.set('views', viewsPath)

// expressServerApp.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Index Template Page - hbs - dynamic value',
//         name: 'Andrew Mead'
//     })
// })

// expressServerApp.get('/fakeabout', (req, res) => {
//     res.render('about', {
//         title: 'About Template Page - hbs - dynamic value',
//         name: 'Andrew Mead'
//     })
// })

// // route handler

// expressServerApp.get('/fakehelp', (req, res) => {
//     res.render('help', {
//         helpMsg: 'This is a helpful msg'
//     })
// })
// server serving up dynamic Pages ==============================



// ADVANCED Templating - handlebar Partials ===========================

// // const hbs = require('hbs')

// // // define path for express config
// const publicStaticDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/myViews')
// const partialsPath = path.join(__dirname, '../templates/myPartials')

// // set up static dir location, handlebars engine, views location and registerPartials path
// expressServerApp.use(express.static(publicStaticDirectoryPath))
// expressServerApp.set('view engine', 'hbs')
// expressServerApp.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// expressServerApp.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Andrew Mead'
//     })
// })

// expressServerApp.get('/fakeabout', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Andrew Mead'
//     })
// })

// expressServerApp.get('/fakehelp', (req, res) => {
//     res.render('help', {
//         title: 'Help Page',
//         name: 'Andrew Mead'
//     })
// })





// expressServerApp.get('/fakeweather', (req, res) => {
//     // res.send('hi')  ====> server cant send two sends
//     if (!req.query.address) {
//         return res.send(':( You must provide an address using query string')
//     }
//     res.send({
//         location: req.query.address,
//         forecast: 'Its raining over here'
//     })
// })


// const hbs = require('hbs')

// // define path for express config
const publicStaticDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/myViews')
const partialsPath = path.join(__dirname, '../templates/myPartials')

// set up static dir location, handlebars engine, views location and registerPartials path
expressServerApp.use(express.static(publicStaticDirectoryPath))
expressServerApp.set('view engine', 'hbs')
expressServerApp.set('views', viewsPath)
hbs.registerPartials(partialsPath)

expressServerApp.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nidhi'
    })
})

expressServerApp.get('/fakeweather', (req, res) => {
    // res.send('hi')  ====> server cant send two sends
    if (!req.query.address) {
        return res.send(':( You must provide an address using query string')
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return req.send({ error })
            }
            res.send({
                address: req.query.address,
                location,  // location: location,
                forecast: forecastData
            })
        })
    })
})



// rending same template or .hbs page but with diff content
expressServerApp.get('/fakehelp/*', (req, res) => {
    res.render('page404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help Article not found'
    })
})

expressServerApp.get('*', (req, res) => {
    res.render('page404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

