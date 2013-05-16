node-express-mongo-bp
=====================

Boilerplate code using node.js, express.js, and mongodb.

myApp/package.json
==================

All the dependencies are outlined here.  Additional modules not in this repository's description:

* nodemon:  Used to automatically restart the server when a file changes.  Handy during development.
* stylus:   Write more minimal CSS
* jade:     Write more minimal HTML

Installing
==========

Assuming you have node.js and npm installed, navigate to the 'myApp' directory, then type in `npm install`.

To use nodemon, you will need to install it so that you have access to it on the command line - you can
do this by installing it globally:

`npm install -g nodemon`

By default, this project is set up to run on [cloud9](http://c9.io).  This means the server listens on
a specific port and ip address, which are assigned by cloud9.  To change this, change the `port` and `ip` 
variables in `myApp/app.js` to whatever is suitable.  Note that for most setups, the `ip` argument can be
omitted entirely, and only the `port` needs to be specified.