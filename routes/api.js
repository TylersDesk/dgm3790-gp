/*
 * Serve JSON to our AngularJS client
 */
var request = require('request');
var cradle  = require('cradle');

/*
 * GET home page.
 */
exports.init = function (app) {

  app.get('/api/:captionid', api);
  app.get('/api/update/:captionid', updateApi);
  app.get('/api', missingParams);
  
  //console.log(req.params.reqMethod);
  //console.log(req.params.name);

  // if(req.params.reqMethod == "put") {
  //   request.put('http://blog.pirho.com:5984/' + req.params.name, function (error, response, body) {
  //     if (!error) {
  //       res.json(body) // Print the google web page.
  //     }
  //   })
  // } else {

  //   request('http://blog.pirho.com:5984/captions/captionroot', function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       res.json(body) // Print the google web page.
  //     }
  //   })
  // }
};


function api(req, res) {
  var params = req.params.captionid;
  console.log("Parameters are: " + params);

  var responseBody;

  //Build URL
  var db = new(cradle.Connection)().database('dgm3790_gp');

  db.get(params, function (err, doc) {
    if(err) { 
      console.log('There was an error getting document: ' + params);
    } else {
      console.log('Successful accesing document');
      res.send(doc.captions);
    }
  });
}

function updateApi(req, res) {
  var params = req.params.captionid;

  var db = new(cradle.Connection)().database('dgm3790_gp');

  db.save(params, {
      captions: [
                     {
                         "caption": "this will be the actual captions",
                         "id": "c1",
                         "plus": 2,
                         "minus": 0
                     },
                     {
                         "caption": "this is a second caption",
                         "id": "c2",
                         "plus": 2,
                         "minus": 0
                     }
                  ]
  }, function (err, res) {
      if (err) {
          // Handle error
          console.log('updated');
      } else {
          // Handle success
          console.log('updated');
      }
  });

}

function missingParams(req, res) {
  res.send(200, "You are missing params. No API call was made.");
}

