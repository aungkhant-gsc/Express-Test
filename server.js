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

app.use('/test', express.static(path.join(__dirname, './public')))


// route
app.use("/", require("./routes/root"))
app.use('/test', require('./routes/test'))
app.use('/employees', require('./routes/api/employee'))


app.all('/*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({err: "404 Not Found!"})
    }else{
        res.type('text').send("404 Not Found!")
    }
})

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))