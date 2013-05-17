module.exports = function (app){
    
    // Root path
    var root = require('../controllers/root');
    app.get('/', root.index);
    
    // Users
    var user = require('../controllers/user');
    app.get('/login', user.login);
    app.get('/signup', user.signup);
    app.post('/signup/handler', user.signupHandler);
    app.post('/logout/handler', user.logoutHandler);
};