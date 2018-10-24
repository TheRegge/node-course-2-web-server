const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // PORT set by heroku

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

// MIDDLEWARE:
// Site under maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// MIDDLEWARE:
// Log server requests
app.use((req, res, next) => {
    // Call next() when done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// MIDDLEWARE:
// Serve a static dir
app.use(express.static(__dirname+'/public'));

// Handlebar template helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// Handlebar template helper
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Route
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Regis',
    //     likes: ['motorcycles', 'good food', 'you know, I\'m french']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my website'
    });
});

// Route
app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// Route
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle the request'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});