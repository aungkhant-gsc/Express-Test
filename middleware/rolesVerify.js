const roleVerify = (...allwedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.status(401).json({message: "You don't have permission!"})
        const rolesList = [...allwedRoles];
        console.log(rolesList);
        console.log(req.roles);

        const checkResult = req.roles.map(role => rolesList.includes(role)).find(vale => vale === true);
        if(!checkResult) return res.status(401).json({message: "You don't have permission!"});

        next();
    }
}

module.exports = roleVerify