module.exports = function (app){
    // Root path
    var root = require('../controllers/root');
    app.get('/', root.index);
    app.get('/login', root.login);
    app.get('/signup', root.signup);
};