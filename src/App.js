import React, {Component} from "react";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Particles from 'react-particles-js';
//import Brain from "./components/Logo/Brain.png";



const particlesConfig = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


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
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputImage")
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)

    return {
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col * width),
      bottomRow: height - (faceBox.bottom_row * height)
    }
  }

  
  // will grab or listen for inputs in the input box(ImageLinkForm)
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }


  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},

        // convert the javascript object to JSON before being sent to the backend server
        body: JSON.stringify({
          input: this.state.input,
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},

            // convert the javascript object to JSON before being sent to the backend server
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
        }
        // Gets fave detection box atrributes
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        this.showFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => // there was an error
        console.log(err))
  }


  showFaceBox = (box) =>  {
    console.log(box);
    this.setState({box: box});
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          params={particlesConfig}
          style={{
            width: '100%',
            backgroundImage: `url()` 
          }}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' // A ternary operator is used.
          ?
            <div>
              <Logo />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonClick={this.onButtonClick}          
                />
              <Rank name={this.state.user.name} entries={this.state.entries}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : ( route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }  
      </div>
    );
  }
}

export default App;
