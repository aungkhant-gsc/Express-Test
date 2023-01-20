require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const notFound = require('./middleware/notFound');
const jwtVerify = require('./middleware/jwtVerify');
const credentials = require('./middleware/credentials');
const port = process.env.PORT || 3500;


//custom middleware

app.use(logger);

app.use(credentials)

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, './public')));

// route
app.use("/", require("./routes/root"));
app.use('/register', require('./routes/api/register'));
app.use('/refresh', require('./routes/api/refresh'));
app.use('/auth', require('./routes/api/auth'));
app.use('/logout', require('./routes/api/logout'));


app.use(jwtVerify);
app.use('/employees', require('./routes/api/employee'));


app.all('/*', notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));