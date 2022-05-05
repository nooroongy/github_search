var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.render('index.html')
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function () {
    app.use(express.static('public'));
    app.use(express.json());
});
