const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 3000;


//custom middleware

app.use(logger)

const Wl = [
    'https://www.google.com',
    'http://localhost:3000',
    'http://127.0.0.1:8000'
]
const corsOptions = {
    origin:(origin, callback) => {
        if(Wl.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },

    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

// route
app.get('^/$|/index(.html)?', (req, res) => {
    //res.send("Hello World")
    //res.sendFile('/views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('old-page(.html)?', (req, res) => {
    //res.redirect('/new-page.html'); // 302 default
    res.redirect(301, '/new-page.html');
})

// route handler
app.get('/hello', (req, res, next) => {
    console.log('Do something/...');
    next();
}, (req, res) => {
    res.json({ message: "hello" })
})



const A = (req, res, next) => {
    console.log('A');
    next()
};

const B = (req, res, next) => {
    console.log('B');
    next()
};

const C = (req, res) => {
    res.send("Finished")
};

app.get('/chain', [A, B, C]);


app.get('/*', (req, res) => {
    //res.status(404).send('not found');
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))