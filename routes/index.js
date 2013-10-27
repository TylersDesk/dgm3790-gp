
var fs = require('fs');

/*
 * GET home page.
 */

exports.init = function (app) {

  app.get('/', index);
  //app.get('/couch/:httpMethod', couch);
  //app.get('/createTest/:dbName', createTest);

};

function index(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
    //console.log('i called index');
    res.send(text);
  });
}

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};