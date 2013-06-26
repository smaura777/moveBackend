/**
 *   Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , gym  = require('./routes/gymbag')
  , map =  require('./maproutecontroller')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8084);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
	throw new Error(req.url + " not found ");
});

app.use(function(err,req,res,next){
	console.log(err);
	res.send(err.message);
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
/**
app.get('/bag', gym.bag);
app.get('/users', user.list);
**/
var prefixes = ['activity','setup'];
prefixes.forEach(function(prefix){
	map.mapRoute(app,prefix);
});


//app.get('/calendar/events/:id',routes.listCalendarEntry);
/**
app.get(/^\/calendar\/events\/id\/([0-9A-Za-z]+)$/,routes.listCalendarEntry);
app.get(/^\/calendar\/events\/((today)|(yesterday)|(tomorrow)|(twoweeksago)|(lastweek)|(thisweek)|(nextweek)|(nexttwoweeks))?$/,routes.listCalendarEntry);
app.get(/^\/calendar\/events\/((thismonth)|(lastmonth)|(nextmonth)|(everymonths))?$/,routes.listCalendarEntry);

app.get(/^\/calendar\/api\/([0-9])([1-9])?(\.[0-9])\/events\/id\/([0-9A-Za-z]+)$/,routes.listCalendarEntry);
app.get(/^\/calendar\/api\/([0-9])([1-9])?(\.[0-9])\/events\/((today)|(yesterday)|(tomorrow)|(twoweeksago)|(lastweek)|(thisweek)|(nextweek)|(nexttwoweeks))?$/,routes.listCalendarEntry);
app.get(/^\/calendar\/api\/([0-9])([1-9])?(\.[0-9])\/events\/((thismonth)|(lastmonth)|(nextmonth)|(everymonths))?$/,routes.listCalendarEntry);
**/


//app.post('/calendar/event/create', routes.createCalendarEntry);

// PUT & Delete


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
