var appName = 'myApp';

exports.index = function(request, response){
    var returnDict = {
        title: appName,
        user: false
    };
    response.render('derived/index', returnDict);
};
exports.signup = function(request, response){
    response.render('derived/signup', {title: appName + ': signup'})
};