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

module.exports = corsOptions