var appName = 'myApp';

exports.index = function(request, response){
    console.log(request.session);
    var returnDict = {
        title: appName,
        appName: appName,
        user: false
    };
    response.render('derived/index', returnDict);
};
