

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.get('/*', function(req, res){
  res.sendFile(distDir + '/index.html');
});

// redireciona todas as requições para o Angular
 var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });