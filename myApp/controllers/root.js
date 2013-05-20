var appName = 'myApp';

exports.index = function(request, response){
    var returnDict = {
        title: appName,
        appName: appName,
        user: false
    };
    response.render('derived/index.jade', returnDict);
};
