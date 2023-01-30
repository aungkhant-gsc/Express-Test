const jwt =  require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({message: "you do not have permission."})

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({message: "Invalid token!"})
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();
        }
    )
}

module.exports = jwtVerify