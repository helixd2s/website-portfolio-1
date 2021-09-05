var Twig = require("twig"),
    express = require('express'),
    path = require('path'),
    app = express(),
    sass = require('sass');
    
    sass.middleware = require('node-sass-middleware-5');

app.use(sass.middleware({
  src: __dirname,
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  log: function (severity, key, value) { console.log(`node-sass-middleware ${key} : ${value}`); }
}));

app.set('view engine', 'twig');
app.set('view options', {layout: false});
app.set('views', __dirname + '/views');

// This section is optional and used to configure twig.
app.set("twig options", {
  allow_async: true, // Allow asynchronous compiling
  strict_variables: false
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.twig', {
    message : "Hello World"
  });
});


const port = process.env.PORT || 9999;
const host = process.env.IP || '0.0.0.0';

app.listen(port, host);
