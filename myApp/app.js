
/**
 * Module dependencies.
 * 
 * stylus       ->  structured and minimal css
 * fs           ->  filesystem access
 * mongoose     ->  mongoDB ORM
 * env          ->  system environment
 * db           ->  this app's database connection secrets
 * engines      ->  consolidate is used to have two view engines - jade and ejs.
 */

var express = require('express'),
    stylus = require('stylus'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    db = require('./config/db')[env],
    engines = require('consolidate');
var app = module.exports = express();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.engine('jade', engines.jade);
    app.engine('ejs', engines.ejs);
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

// database
mongoose.connect(db.db);

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});

// Routes
require('./config/routes')(app);

var port    =   process.env.PORT,
    ip      =   process.env.IP;

app.listen(port, ip);
console.log("Express server listening on %s:%d in %s mode", ip, port, app.settings.env);
