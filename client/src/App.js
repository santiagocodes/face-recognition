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
   inputText: 'Enter a valid image url.',
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
      this.setState({ inputText: event.target.value });
   };

   onValidImageUrl = () => {
      const validImageFormat = ['jpg','jpeg','tiff','png','gif','bmp'];
      const url = this.state.inputText;
      const urlParts = url.split('.');
      const extension = urlParts[urlParts.length-1];
      
      if( validImageFormat.includes(extension) ) {
         this.onImageSubmit();
      } else {
         this.setState({
            input: "Enter a valid image url." 
         });
      }
   }

   onImageSubmit = () => {
      this.setState({ imageUrl: this.state.inputText })
      fetch('/imageurl', {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            inputText: this.state.inputText,
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
                     inputText={inputText}
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
