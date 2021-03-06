const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather !',
        name: 'Alan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Alan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alan',
        message: 'Do you need help ?'
    })
})

// app.get('/faustao', (req, res) => {
//     res.render('fausto', {
//         title: 'Faustão',
//         name: 'Alan',
//         message: 'Do you need help ?'
//     })
// })


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }        
                
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, {summary}) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        forecast: summary,
                        location: location,
                        address: req.query.address,
                    })
                }                
            })
        }        
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'help article not found',
        name: 'Alan',
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'page not found',
        name: 'Alan',
    })    
})

app.listen(port, () => {
    console.log('server is running at ' + port)
})