const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utiles/geoCode')
const forcast = require('./utiles/forcast')


const app = express()
const port = process.env.PORT || 3000

//creating path for express conf
const staticHtmlPath = path.join(__dirname,'/../public')
const viewsFolderPath = path.join(__dirname, '/../views')
const partialpath = path.join(__dirname,'/../views/partials')

//setup a diractionary for static pages
app.use(express.static(staticHtmlPath))

//setup handelbars and views
app.set('views', viewsFolderPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialpath)

//setup routes
app.get('', (req, res) => {
    res.render('index', {
        title:'Wether App',
        me:'Siamak Nikfar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        me:'Siamak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help page',
        me:'Siamak Nikfar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        res.send({err:'please enter an adress'})
    }else{
        geoCode(req.query.adress, (err, {latitude, longitude, location} = {}) => {
            if(err){
                res.send({ err })
            }else{
                forcast(latitude, longitude, (error, forcastData) => {
                    if(error){
                        res.send({ error })
                    }else{
                        const cityName = location.split(',')
                        console.log(forcastData)
                        // res.send(`the wather in ${cityName[0]} is ${forcastData} right now.`)
                        res.send({
                            cityName,
                            forcastData
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error:'help article not found',
        title:'404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error:'page not found',
        title:'404'
    })
})

//set where our app going to run
app.listen(port, () => {
    console.log('the server is running on port 3000')
})

console.log(staticHtmlPath)
