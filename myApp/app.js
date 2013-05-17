
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    stylus = require('stylus');

var app = module.exports = express();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'your secret here' }));
    
    app.use(stylus.middleware({
        debug:      true,
        src:        __dirname + '/public',
        compile:    stylusCompiler
    }));
    
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});


function stylusCompiler(str){
    return  stylus(str)
            .set('compress', true);
}


app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var port    =   process.env.PORT,
    ip      =   process.env.IP;

app.listen(port, ip);
console.log("Express server listening on %s:%d in %s mode", ip, port, app.settings.env);
