// #1
let express = require('express');
let app = express();

// #2
let path = require('path');

// #3
app.use(express.static(__dirname + '/public/dist'));

// #4
let morgan = require('morgan');
app.use(morgan('dev'));

// #5
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// #6
var usersRouter = require('./routes/users');
app.use('/', usersRouter);


// router.all("/*", (req, res, next) => {
//   let _path = '../client/dist/index.html';
//   console.log(_path)
//   res.sendfile(path.resolve(_path));
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(3000, () => console.log('server running'));
module.exports = app;