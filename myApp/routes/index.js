
/*
 * GET home page.
 */

exports.index = function(request, response){
  response.render('derived/index', { title: 'Express 3.0' })
};