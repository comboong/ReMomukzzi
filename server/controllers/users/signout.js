const { user } = require('../../models');
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    console.log('sign out')
    const logininfo = req.headers.authorization;

    if (logininfo){
        const token = logininfo.split(" ")[1]
        const data = jwt.verify(token, "1234")


        user.destroy({
            where : {
                user_id : data.user_id
            }
        }).then(res.status(200).json({message : "Sign out done!"}))
        
    }else{
        res.status(400).json({message : "login first!"})}
}

