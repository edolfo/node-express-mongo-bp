var appName = 'myApp',
    mongoose = require('mongoose'),
    User = mongoose.model('User');

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
    if (pass1.length === 0 || pass2.length === 0 || email.length === 0){
        return response.json(200, {'statusCode': 1, 'message': 'Empty submissions not allowed!'});
    }
    else if (pass1 != pass2){
        return response.json(200, {'statusCode': 2, 'message': 'Passphrases must match!'});
    }
    var user = new User({email:email, hashedPass:pass1});
    user.save(function(err){
        if (err){
            console.log('Error in saving new user with email ' + email + ', error was ' + err.errors);
            return response.json(200, {'statusCode': 3, 'message': 'Error saving new user'});
        }
    });
    return response.json(200, {'statusCode': 0, 'message': 'Successfully signed up!'});
};

exports.login = function(request, response){
    var returnDict = {
        title: appName + ': login',
        appName: appName
    };
    response.render('derived/login', returnDict);
};

/*
*   Here we return the same error message and code to shield against attackers trying to
*   find a valid email address.  However, we log all of the errors separately.
*/
exports.loginHandler = function(request, response){
    var email = request.body.email;
    User.findOne({email: email})
        .exec(function(err, user){
            if (err){
                console.log('Failed to login user with email %s because %s', email, err);
                return response.json({'statusCode': 1, 'message': 'Failed to login'});
            }
            if (!user){
                console.log('Unable to find user with email %s', email);
                return response.json({'statusCode':1, 'message': 'Failed to login'});
            }
            else{
                request.session.regenerate(function(){
                    request.session.user = user;
                    return response.json({'statusCode':0, 'message': 'Successfully logged in!'});
                });
            }
        });
};

exports.logoutHandler = function(request, response){
    request.session.destroy(function(){
        return response.redirect('/');
    });
};