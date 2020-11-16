const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
// require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Database Connection
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
   client: 'pg',
   connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
   },
});

// const db = knex({
//    client: 'pg',
//    connection: {
//      host : '127.0.0.1',
//      user : 'postgres',
//      password : process.env.DATABASE_DEV_PASSWORD,
//      database : 'face-recognition'
//    }
//  });

// express
const app = express();
app.use(express.json());

// body parser
app.use(bodyParser.json());

// cors
// const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'http://santiagocodes-face-recognition.heroku.com', 'https://santiagocodes-face-recognition.heroku.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))
app.use(cors())

// Serve React to the browser
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// ENDPOINTS

app.get('/', (req, res) => { 
   res.send(db.users) 
});

// signin --> POST success/fail
// ... signin existing user
app.post('/signin', (req, res) => {
   signin.handleSignin(req, res, db, bcrypt);
});

// register --> POST user
// ... create new user
app.post('/register', (req, res) => {
   console.log('register endpoint');
   register.handleRegister(req, res, db, bcrypt);
});

// profile/:userId --> GET user
// ... get specific user's information
app.get('/profile/:id', (req, res) => {
   profile.handleProfile(req, res, db);
});

// image --> PUT user
// ... update/increase entries by 1 every time user submits new image
app.put('/image', (req, res) => {
   image.handleImage(req, res, db);
});

// image --> post image
// ... submit new image to clarifai
app.post('/imageurl', (req, res) => {
   image.handleApiCall(req, res);
});

// Listening to port...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`App is running on port ${PORT}.`);
});

// Pre connection to DataBase
// const database = {
//    users: [
//       {
//          id: '123',
//          name: 'John',
//          email: 'john@gmail.com',
//          password: 'cookies',
//          entries: 0,
//          joined: new Date(),
//       },
//       {
//          id: '124',
//          name: 'Jane',
//          email: 'jane@gmail.com',
//          password: '123456',
//          entries: 0,
//          joined: new Date(),
//       },
//    ],
//    login: [
//       {
//          id: '123',
//          hash: '$2a$10$r6i0HzMdLcEqrQzQh9nwaODf9Zj2pbh4cIC30cjVh/HsxHOGzYyau',
//          email: 'john@gmail.com',
//       },
//       {
//          id: '124',
//          hash: '$2a$10$kW4xZu4pmV0KU6ip1mgrzeNkRtkGUCStiJos.pFJrjIoCme2h07mG',
//          email: 'jane@gmail.com',
//       },
//    ],
// };
//
// // register --> POST user
// // ... create new user
// app.post('/register123', (req, res) => {
//    const { email, name, password } = req.body;
//    bcrypt.hash(password, null, null, function (err, hash) {
//       // Store hash in your password DB.
//       console.log(hash);
//    });
//    database.users.push({
//       id: '125',
//       name: name,
//       email: email,
//       password: password,
//       entries: 0,
//       joined: new Date(),
//    });
//    res.json(database.users[database.users.length - 1]);
// });
//
// // profile/:userId --> GET user
// // ... get specific user's information
// app.get('/profile123/:id', (req, res) => {
//    const { id } = req.params;
//    let found = false;
//    database.users.forEach((user) => {
//       if (user.id === id) {
//          found = true;
//          return res.json(user);
//       }
//    });
//    if (!found) {
//       res.status(400).json('not found');
//    }
// });
//
// // image --> PUT user
// // ... update/increase entries by 1 every time user submits new image
// app.put('/image', (req, res) => {
//    const { id } = req.body;
//    let found = false;
//    database.users.forEach((user) => {
//       if (user.id === id) {
//          found = true;
//          user.entries++;
//          return res.json(user.entries);
//       }
//    });
//    if (!found) {
//       res.status(400).json('not found');
//    }
// });
//
// // signin --> POST success/fail
// // ... create existing user
// app.post('/signin', (req, res) => {
//    // Load hash from your password DB.
//    // bcrypt.compare(
//    //    'cookies',
//    //    '$2a$10$r6i0HzMdLcEqrQzQh9nwaODf9Zj2pbh4cIC30cjVh/HsxHOGzYyau',
//    //    function (err, res) {
//    //       console.log('correct password', res);
//    //       console.log('error', err);
//    //    }
//    // );
//    if (
//       req.body.email === database.users[0].email &&
//       req.body.password === database.users[0].password
//    ) {
//       res.json('success');
//    } else {
//       res.status(400).json('error logging in');
//    }
// });
//
// // signin --> POST success/fail
// // ... create existing user
// app.post('/signin', (req, res) => {
//    // Load hash from your password DB.
//    // bcrypt.compare(
//    //    'cookies',
//    //    '$2a$10$r6i0HzMdLcEqrQzQh9nwaODf9Zj2pbh4cIC30cjVh/HsxHOGzYyau',
//    //    function (err, res) {
//    //       console.log('correct password', res);
//    //       console.log('error', err);
//    //    }
//    // );
//    if (
//       req.body.email === database.users[0].email &&
//       req.body.password === database.users[0].password
//    ) {
//       res.json('success');
//    } else {
//       res.status(400).json('error logging in');
//    }
// });

// const port = 3000;
// app.listen(port, () => {
//    console.log(`App is running on port ${port}.`);
// });
