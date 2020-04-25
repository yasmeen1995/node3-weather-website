const path = require ('path')
const express = require('express')  
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express() 

const port = process.env.PORT || 3000

// Define pats for Express config
const publicDirectoyPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loaction
app.set('view engine', 'hbs') // ('key','value') Handlebar setup done here
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoyPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yasmeen'
    })     
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yasmeen'
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Welcome To Help Page',
        title: 'Help',
        name: 'Yasmeen'
    })
})

app.get('/weather', (req, res) => {
    //console.log(req.query.address)
    if (!req.query.address){
        return res.send({
            error: 'Please provide a valid address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                latitude: latitude,
                location: location,
                forecastData: forecastData
            })
    

        })
        
    })
   
})

app.get('/products', (req, res)=> {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    
    res.send({
        products: []
    })
})



//matchung specific patterns
app.get('/help/*', (req,res) => {  // localhost:3000/help/you
    res.render('404', {
        title: '404',
        name:'Yasmeen',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {   //wildcart char is to convey "if there is no match do this" 
    res.render('404',{
        title: '404',
        name:'Yasmeen',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})





