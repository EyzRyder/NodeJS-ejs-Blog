require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();
const port = process.env.PORT;

// connect to mogoDB
const dbURI = process.env.dbURI;
mongoose.set("strictQuery", true);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port,()=>console.log(`Server is listening on ${port}`));
        console.log("connect to db");
    })
    .catch((err) => console.log(err));
// register view engine

// Static Files
// app.use(express.static('public'));
// Specific folder examp

app.set('view engine', 'ejs');
//  app.set('views', 'name of the folder');

// listen for requests

//middleware 
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));  //to be especifica
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog 2',
//         snippet: 'about it , i know creative',
//         body: 'even more about it, great'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => { 
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('6395f7ce4ee491154a150da5')
//         .then((result) => { 
//             res.send(result);
//         })
//         .catch((err) => { 
//             console.log(err);
//         });
// });

app.get('/', function (req, res) {
    // res.send('<p>Home Page</p>');
    res.redirect('/blogs');
});

app.get('/about', function (req, res) {
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About' })

});

// blog routes
app.use('/blogs', blogRoutes);

// 4040 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' })

});