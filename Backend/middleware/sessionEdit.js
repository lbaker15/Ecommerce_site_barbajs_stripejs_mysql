const sequelize = require('../util/database');
const User = require('../models/user');

module.exports = (req,res,next) => {
    console.log("SessionID: " + req.sessionID);
    if (req.headers.authorization !== undefined) {
        console.log('Cookie set on front end')
        console.log(req.headers.authorization)
        let auth = Object.values(JSON.parse(req.headers.authorization));
        let authID = Object.keys(JSON.parse(req.headers.authorization));
        // console.log(auth, authID)
        let userId = auth[0].user.id;
        console.log(authID)
        //Check that the cookie session id is in the session db
        sequelize.query(`SELECT * FROM sessions WHERE session_id = "${authID}"`)
        .then(loga => {
            console.log(loga)
            //Cookie has expired so does not exist in db
            if (loga[0].length === 0) {
                next()
            } else {
            //Check that the user id from the cookie equals the id held in session db
            let dataCol = Object.values(Object.values(loga[0]))[0].data
            let dbUserId = JSON.parse(dataCol).user.id
            if (dbUserId === userId) {
            //Check the user id from the cookie does exist as a user in user db
            User.findByPk(userId)
                .then(user => {
                    req.user = user;
                    user.createCart()
                    next();
                })
            } else {
                next();
            }
            }
        })
    } else {
        console.log('No cookie set on front end')
        //Some kind of variable here that makes routes protected
        next();
    }
}

// exports.sessionEditMiddleware = sessionEditMiddleware;