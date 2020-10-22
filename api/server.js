const express = require('express');

const app = express();

app.use(express.json());

const database = {
   users: [
      {
         id: '123',
         name: 'John',
         email: 'john@gmail.com',
         password: 'cookies',
         entries: 0,
         joined: new Date(),
      },
      {
         id: '124',
         name: 'Jane',
         email: 'jane@gmail.com',
         password: '123456',
         entries: 0,
         joined: new Date(),
      },
   ],
};

app.get('/', (req, res) => {
   // res.send('this is working');
   res.send(database.users);
});

// signin --> POST success/fail
// ... create existing user
app.post('/signin123', (req, res) => {
   // res.json('signin');
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
app.post('/register123', (req, res) => {
   const { email, name, password } = req.body;
   database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
   });
   res.json(database.users[database.users.length - 1]);
});

// profile/:userId --> GET user
// ... get specific user's information
app.get('/profile123/:id', (req, res) => {
   const { id } = req.params;
   let found = false;
   database.users.forEach((user) => {
      if (user.id === id) {
         found = true;
         return res.json(user);
      }
   });
   if (!found) {
      res.status(400).json('not found');
   }
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
