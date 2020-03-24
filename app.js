const express = require('express');
const path= require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')

// Load User Model
require('./models/User');
require('./models/Banking')

morgan('tiny')


// Load Routes
const routes = require('./routes/index');

// Load Keys
const keys = require('./config/keys');
// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.use(morgan('combined'))
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




// Set global varsrs
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
//set static folder
app.use(express.static(path.join(__dirname,'public')));
// Use Routes
app.use('/', routes);

//port for deployment
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});