const userDb = {
    users: require("../models/users.json"),
    setUsers: function(data){this.users = data}
};
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { username, pwd } = req.body;

    if(!username || !pwd ) return res.status(400).json({message: "Username or password are required."})

    const isUser = userDb.users.find(usr => usr.username === username);
    if(!isUser) return res.status(401).json({ message: `User not found with ${username}` });

    // check password

    const isMatch = await bcrypt.compare(pwd, isUser.password);
    if(isMatch){
        // create JWT
        res.status(200).json({ message: `User ${username} successfully logged in.`})
    }else{
        res.status(401).json({ message: "Password do not match!" })
    }
}

module.exports = {
    handleLogin
}