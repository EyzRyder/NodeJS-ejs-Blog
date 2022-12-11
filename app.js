const express = require('express');
const morgan = require('morgan');
//express app
const app = express();
const port = 3000
// register view engine

// Static Files
// app.use(express.static('public'));
// Specific folder example
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))

app.set('view engine', 'ejs'); 
//  app.set('views', 'name of the folder');


// listen for requests
app.listen(port);

//middleware 
app.use('/public', express.static(__dirname + '/public'))
app.use(morgan('dev'));

app.get('/', function (req, res) {
    // res.send('<p>Home Page</p>');

    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs })
});

app.get('/about', function (req, res) {
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' })

});

// redirects
app.get('/blogs/create', (req, res) => {
    res.render('create',{ title: 'Create a New Blog' })
});

// 4040 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' })

});