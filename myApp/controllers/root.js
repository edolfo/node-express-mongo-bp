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

/*
* Here the statusCode variable is modeled after unix exit codes - zero is fine, non-zero is a problem.
*/
exports.signupHandler = function(request, response){
    var email = request.body.email,
        pass1 = request.body.pass1,
        pass2 = request.body.pass2;
    if (pass1 != pass2){
        response.json(200, {'statusCode': 1, 'message': 'Passphrases must match!'});
    }
    response.json(200, {'statusCode': 0, 'message': 'Successfully signed up!'});
};

exports.login = function(request, response){
    var returnDict = {
        title: appName + ': login',
        appName: appName
    };
    response.render('derived/login', returnDict);
};