/*
 * Serve JSON to our AngularJS client
 */
var request = require('request');

exports.api = function (req, res) {
  
  console.log(req.params.reqMethod);
  console.log(req.params.name);

  if(req.params.reqMethod == "put") {
    request.put('http://blog.pirho.com:5984/' + req.params.name, function (error, response, body) {
      if (!error) {
        res.json(body) // Print the google web page.
      }
    })
  } else {

    request('http://blog.pirho.com:5984/captions/captionroot', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(body) // Print the google web page.
      }
    })
  }
};

