import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'


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

//! Declaring initial state before setting state to clear out user
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
  id: '',
  name: '',
  entries: 0,
  joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
    }

  loadNewUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
    }});
  }

  //? Function that calculates bounding box around face
  calculateFaceLocation = (data) => {
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  //? Function that displays bounding box around face
  displayBoundingBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://murmuring-escarpment-92881.herokuapp.com/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://murmuring-escarpment-92881.herokuapp.com:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayBoundingBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles 
          params={ particleOptions }
          className="particles"
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo /> 
              <Rank name={this.state.user.name} entries={this.state.user.entries}   />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} loadNewUser={this.loadNewUser} /> 
              : <Register onRouteChange={this.onRouteChange} loadNewUser={this.loadNewUser} />
            )
        }
      </div>
    );
  }
}

export default App;
