const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '4rtghlae',
	database: 'ecommerce'
};
var sessionStore = new MySQLStore(options);
module.exports = session({
    secret: 'session_secret', 
    key: 'session_key',
    store: sessionStore,
    resave: false, 
    saveUninitialized: true,
    proxy: false,
    cookie: {
        maxAge: 1000 * 60 * 15,
        secure: false,
        httpOnly: true,
        sameSite: false
    }
});