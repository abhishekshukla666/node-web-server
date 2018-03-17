const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `Now: ${now}, Method: ${req.method}, Url: ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append the server log message.')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenence.hbs', {
//         pageTitle: 'Maintenence Page',
//         pageBody: 'Under Maintenence!!'
//     })
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.get('/', (req, res) => {
    // res.send('<h1>Hello Abhishek, Welcome to JS world!!</h1>')
    // res.send({
    //     name: 'Abhishek',
    //     likes: [
    //         'technology',
    //         'fitness'
    //     ]
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageBody: 'Welcome Guest, This is my home page'
    })
})


app.get('/about', (req, res) => {
    // res.send('about page')
    res.render('about.hbs', {
        pageTitle: 'About HBS Page',
        pageBody: 'Welcome to About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorCode: '3333',
        errorMessage: 'Something bad happend!'
    })
})

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page',
        pageBody: 'New port pholio'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})