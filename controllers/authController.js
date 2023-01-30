const userDb = {
    users: require("../models/users.json"),
    setUsers: function(data){this.users = data}
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromiss = require('fs').promises
const path = require('path');

const handleLogin = async (req, res) => {
    const { username, pwd } = req.body;

    if(!username || !pwd ) return res.status(400).json({message: "Username or password are required."})

    const isUser = userDb.users.find(usr => usr.username === username);
    if(!isUser) return res.status(401).json({ message: `User not found with ${username}` });

    // check password

    const isMatch = await bcrypt.compare(pwd, isUser.password);
    if(isMatch){
        

        const roles = Object.values(isUser.roles)

        const accessToken = jwt.sign(
            {
                userInfo: {
                    username: isUser.username,
                    roles: roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30s"}
        );

        const refreshToken = jwt.sign(
            {username: isUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        );
        

        
        // userDb.users.map(user => {
        //     if(user.username === isUser.username){
        //         user.refreshToken = refreshToken
        //     }
        // })

        const otherUser = userDb.users.filter(usr => usr.username !== isUser.username);
        const currentUser = {...isUser, refreshToken}
        
        userDb.setUsers([...otherUser, currentUser])
        
        await fsPromiss.writeFile(
            path.join(__dirname, "..", "models", "users.json"),
            JSON.stringify(userDb.users)
        )

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        
        res.status(200).json({ accessToken })
    }else{
        res.status(401).json({ message: "Password do not match!" });
    }
}

module.exports = {
    handleLogin
}