import React from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Footer from './components/Footer/Footer';
import './App.css';

const particlesOptions = {
   particles: {
      number: {
         value: 30,
         density: {
            enable: true,
            value_area: 800,
         },
      },
   },
};

const initialState = {
   input: '',
   imageUrl: '',
   box: {},
   route: 'signin',
   isSignedIn: false,
   user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
   },
};

class App extends React.Component {
   constructor() {
      super();
      this.state = initialState;
   }

   loadUser = (data) => {
      this.setState({
         user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
         },
      });
   };

   calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
         leftCol: clarifaiFace.left_col * width,
         topRow: clarifaiFace.top_row * height,
         rightCol: width - clarifaiFace.right_col * width,
         bottomRow: height - clarifaiFace.bottom_row * height,
      };
   };

   displayFaceBox = (box) => {
      this.setState({ box: box });
   };

   onInputChange = (event) => {
      this.setState({ input: event.target.value });
   };

   onValidImageUrl = () => {
      this.setState({ imageUrl: this.state.input })
      const validImageFormat = ['jpg','jpeg','tiff','png','gif','bmp'];
      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length-1];
      
      if( validImageFormat.includes(extension) ) {
         return this.onImageSubmit;
      } else {
         this.setState({
            imageUrl: '', 
            input: "Enter a valid image url." 
         });
      }
   }

   onImageSubmit = () => {
      // this.setState({ imageUrl: this.state.input })
      fetch('/imageurl', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            input: this.state.input,
         }),
      })
         .then((response) => response.json())
         .then((response) => {
            if (response) {
               fetch('/image', {
                  method: 'put',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     id: this.state.user.id,
                  }),
               })
               .then((response) => response.json())
               .then((count) => {
                  this.setState(
                     Object.assign(this.state.user, { entries: count })
                  );
               })
               .catch(console.log);
            }
            this.displayFaceBox(this.calculateFaceLocation(response));
         })
         .catch((err) => console.log(err)) 
   };

   onRouteChange = (route) => {
      if (route === 'signout') {
         this.setState(initialState);
      } else if (route === 'home') {
         this.setState({ isSignedIn: true });
      }
      this.setState({ route: route });
   };

   render() {
      const { isSignedIn, imageUrl, route, box } = this.state;
      return (
         <div className="App">
             <div className="content">
            <Particles className="particles" params={particlesOptions} />
            
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            {route === 'home' ? (
               <div>
                  <Rank
                     name={this.state.user.name}
                     entries={this.state.user.entries}
                     imageUrl={imageUrl}
                  />
                  <ImageLinkForm
                     onInputChange={this.onInputChange}
                     onValidImageUrl={this.onValidImageUrl}
                  />
                  <FaceRecognition box={box} imageUrl={imageUrl} />
               </div>
            ) : (
               route === 'signin'
               ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
               : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )}

            </div>
            
            <Footer/>
         </div>
      );
   }
}

export default App;
