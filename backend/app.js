//*declaration des dependance*//
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const userpost = require('./routes/userpost');
const comment = require('./routes/comment');
const path = require('path');
const app = express();
require('dotenv').config()
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty({ uploadDir: './images' });

app.use(multipartyMiddleware,(req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//Utilisation des routes//

app.use(bodyParser.json()); 

// for parsing application/xwww-

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/userpost', userpost);
app.use('/api/comment', comment);
module.exports = app;