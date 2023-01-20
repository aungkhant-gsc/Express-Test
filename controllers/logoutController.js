const userDb = {
    users: require("../models/users.json"),
    setUsers: function(data){this.users = data}
};

const fsPromiss = require('fs').promises
const path = require('path');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204).json({ message: 'No Content!' });

    const refreshToken = cookies.jwt;

    const isUser = userDb.users.find(usr => usr.refreshToken === refreshToken);

    if(!isUser){
        res.clearCookie(
            'jwt',
            {
                httpOnly: true,
                // sameSite: 'None',
                // secure: true,
                //maxAge: 24 * 60 * 60 * 1000
            }
        )

        return res.status(204).json({message: 'No user founded!'});
    }

    const othersUser = userDb.users.filter(usr=> usr.refreshToken !== isUser.refreshToken);
    const currentUser = {...isUser, refreshToken: ""};
    userDb.setUsers(userDb.users);

    await fsPromiss.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(userDb.users)
    )
    res.clearCookie(
        'jwt',
        {
            httpOnly: true,
            // sameSite: 'None',
            // secure: true,
            //maxAge: 24 * 60 * 60 * 1000
        }
    )

    res.sendStatus(204);
}

module.exports = {
    handleLogout
}