const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('./config/passport')
const Session = require('express-session')
const jwt = require('jsonwebtoken');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tokenRouter = require('./routes/token');
const bicicletasRouter = require('./routes/bicicletas');
const bicicletasAPIRouter = require('./routes/api/bicicletas');
const usuariosAPIRouter = require('./routes/api/usuarios');
const {static} = require("express");
const {decode} = require("jsonwebtoken");

const store = new Session.MemoryStore

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('secretKey','jwt_pwd_!!223344')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Session({
  cookie: {
    maxAge: 864000000,
    store: store,
    saveUninitialized: true,
    resave: 'true',
    secret: 'true',
  }
}))
app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('token', tokenRouter);
app.use('/bicicletas',bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.use(passport.initialize());
app.use(passport.session())

app.get('/login', (req, res) => {
  res.render('session/login')
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

app.post('/login', (req, res, next)=> {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.render('session/login', {info});
    }
    req.login(user, (err)=> {
      if (err) {
        return next(err)
      }
      return res.redirect('/');
    });
  })(req, res, next)
}

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log('Usuario sin loguearse');
    res.redirect('/login')
  }
}

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        message: err.message,
        data: null
      })
    } else {
      req.body.userId = decoded.id;
      console.log('JWT Verify: ' + decoded);
      next();
    }
  })
}

module.exports = app;
