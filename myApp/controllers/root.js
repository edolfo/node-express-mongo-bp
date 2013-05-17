var appName = 'myApp';

exports.index = function(request, response){
    var returnDict = {
        title: appName,
        appName: appName,
        user: false
    };
    response.render('derived/index', returnDict);
};

exports.signup = function(request, response){
    var returnDict = {
        title: appName + ': signup',
        appName: appName
    };
    response.render('derived/signup', returnDict);
};

exports.login = function(request, response){
    var returnDict = {
        title: appName + ': login',
        appName: appName
    };
    response.render('derived/login', returnDict);
};