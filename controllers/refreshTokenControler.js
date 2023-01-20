const userDb = {
    users: require("../models/users.json"),
    setUsers: function(data){this.users = data}
};

const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized!' })

    const refreshToken = cookies.jwt;

    const isUser = userDb.users.find(usr =>  usr.refreshToken === refreshToken);
    if(!isUser) return res.status(403).json({message: "User not found!"});

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || isUser.username !== decoded.username) return res.status(403).json({message: "Invalid token or user."});

            const accessToken = jwt.sign(
                {username: isUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "30s"}
            );

            res.status(200).json(accessToken)
        }
    )
}

module.exports = {
    handleRefreshToken
}