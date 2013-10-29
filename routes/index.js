/*
 * GET home page.
 */
 
exports.init = function (app) {

  app.get('/', index);
  //app.get('/couch/:httpMethod', couch);
  //app.get('/createTest/:dbName', createTest);

};

function index(req, res) {
  res.render(__dirname + '/public/index', 'utf8', function(err, html){
    //console.log('i called index');
    res.send(html);
  });
}

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};