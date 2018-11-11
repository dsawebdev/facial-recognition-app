import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn'

//?Clarifai API
const app = new Clarifai.App({
 apiKey: '1aa2f2835e9043f79505db5d3282daf5'
});

//?Particle Overlay Options
const particleOptions = {
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 600
      }
    },
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)
    return {
      leftCol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  displayBoundingBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

  onRouteChange = () => {
    this.setState({route: 'home'})
  }

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayBoundingBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Particles 
          params={ particleOptions }
          className="particles"
        />
        <Navigation />
        { this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange}/> : 
          <div>
            <Logo /> 
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
