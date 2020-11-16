const Clarifai = require('clarifai');
// require('dotenv').config();

const app = new Clarifai.App({
   apiKey: process.env.CLARIFAI
});

const handleApiCall = (req, res) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.inputText)
      .then((data) => {
         res.json(data);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json('Unable to work with API.');
      });
};

const handleImage = (req, res, db) => {
   const { id } = req.body;
   db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => res.json(entries[0]))
      .catch(err => {
         console.log(err)
         res.status(400).json('unavailable')
      });
};

module.exports = {
   handleImage,
   handleApiCall,
};
