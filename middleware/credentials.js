const Wl = [
    'https://www.google.com',
    'http://localhost:3000',
    'http://127.0.0.1:8000'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(Wl.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials