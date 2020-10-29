const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
   client: 'pg',
   connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'face-recognition',
   },
});

// db.select('*')
//    .from('users')
//    .then((data) => {
//       console.log(data);
//    });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send(database.users);
});

// signin --> POST success/fail
// ... create existing user
app.post('/signin', (req, res) => {
   // Load hash from your password DB.
   // bcrypt.compare(
   //    'cookies',
   //    '$2a$10$r6i0HzMdLcEqrQzQh9nwaODf9Zj2pbh4cIC30cjVh/HsxHOGzYyau',
   //    function (err, res) {
   //       console.log('correct password', res);
   //       console.log('error', err);
   //    }
   // );
   if (
      req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password
   ) {
      res.json('success');
   } else {
      res.status(400).json('error logging in');
   }
});

// register --> POST user
// ... create new user
app.post('/register', (req, res) => {
   const { email, name, password } = req.body;
   bcrypt.hash(password, null, null, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
   });
   db('users')
      .returning('*')
      .insert({
         email: email,
         name: name,
         joined: new Date(),
      })
      .then((user) => {
         res.json(user[0]);
      })
      .catch((err) => res.status(400).json('Unable to register.'));
});

// profile/:userId --> GET user
// ... get specific user's information
app.get('/profile/:id', (req, res) => {
   const { id } = req.params;
   db.select('*')
      .from('users')
      .where({ id })
      .then((user) => {
         user.length ? res.json(user[0]) : res.status(400).json('User not found :(');
      })
      .catch((err) => res.status(400).json('Error getting user.'));
});

// image --> PUT user
// ... increase entries by 1 every time user submits new image
app.put('/image', (req, res) => {
   const { id } = req.body;
   let found = false;
   database.users.forEach((user) => {
      if (user.id === id) {
         found = true;
         user.entries++;
         return res.json(user.entries);
      }
   });
   if (!found) {
      res.status(400).json('not found');
   }
});

const port = 3000;
app.listen(port, () => {
   console.log(`App is running on port ${port}.`);
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
