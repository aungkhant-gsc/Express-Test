const userDb = {
    users: require("../models/users.json"),
    setUsers: function(data){this.users = data}
};

const fsPromiss = require('fs').promises
const path = require('path');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const { username, pwd } = req.body;

    if(!username || !pwd ) return res.status(400).json({message: "Username or password are required."})

    const duplicate = userDb.users.find(usr => usr.username === username);

    if(duplicate) return res.status(409).json({ message: "Username already in used!" })

    try {

        const hashedPwd = await bcrypt.hash(pwd, 10);

        const newUser = {
            username,
            password: hashedPwd
        };

        userDb.setUsers([...userDb.users, newUser]);
        
        // write to json file with fs
        await fsPromiss.writeFile(
            path.join(__dirname, "..", "models", "users.json"),
            JSON.stringify(userDb.users)
        );

        console.log(userDb.users);

        res.status(201).json({message: `New user ${username} created!`});

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    createNewUser
}