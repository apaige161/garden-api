
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");

//ROUTES//
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
//actually the individual plant
const gardensRoute = require('./routes/gardens');
//CRUD as a whole garden
const userGardenRoute = require('./routes/userGarden');
//harvest
const harvestRoute = require('./routes/harvests');


//execute dotenv
dotenv.config();


//SERVER SETUP//
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));



/*******************************************************************OLD way *********************/
//fires for all requests
///set headers for CORS
// app.use((req, res, next) => {
//   //manipulate response
//   //allow acces from any domain --security????
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   //incoming request may have these extra headers
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   //header sent by the browser to check if the request is valid
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

/*******************************************************************NEW way *********************/
// allow http requests from this trusted website 
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://urbangridgarden.com",
      "http://www.urbangridgarden.com",
      "https://urbangridgarden.com",
      "https://www.urbangridgarden.com",
    ],
    credentials: true, // allows to send cookies with credentials to the origin defined here ^^
  })
);

/******* connect to mongo db ********/
const MongoClient = require('mongodb').MongoClient;

//connection string to db
const uri = process.env.MDB_CONNECT;

//connect cloud mongoose
//second param are the options
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('mongodb connected!');
}).catch(() => {
  console.log('Connection Failed...')
});



//allow access to images folder
//any requests targeting /images will be allowed
app.use("/images", express.static(path.join("backend/images")));

//PATH TO ROUTES//
//filter requested used and send to postsRouts
app.use("/api/posts", postsRoutes);
//filter requested used and send to userRoutes
app.use("/api/user", userRoutes);
//filter requested send to gardens
app.use('/api/gardens', gardensRoute);
//attempt to send an array of plants instead of one at a time
app.use('/api/userGarden', userGardenRoute);
app.use('/api/harvest', harvestRoute);


module.exports = app;
