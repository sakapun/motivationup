var express = require('express');
var app = express();
var client = require('cheerio-httpcli');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
	client.fetch('https://jp.pinterest.com/search/pins/', { q: 'japanese+pottery' }, function (err, $) {
		var img = $(".pinWrapper img").eq(0).attr('src');
		var href = $(".pinWrapper a.pinImageWrapper").eq(0).attr('href');
		res.render("index", {
			link1: "https://jp.pinterest.com" + href,
			img1: img});
	});
});

app.listen(app.get('port'));