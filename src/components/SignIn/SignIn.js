import React, { Component } from "react";

// Convert the SignIn function to a class so that we can add state.(for form inputs)
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  //Will listen to onChange events in the email input box
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  // Will listen to onChange events in the password input box
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  // will use the state to fetch()
  onSubmitSignIn = () => {
    // sends the email and password from the browser
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},

      // convert the javascript object to JSON before being sent to the backend server
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) { // does the user exist? Did we receive a user with a property of id?
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    })
  }


  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
            </div>
            <div className="lh-copy mt3"> 
              <p onClick={() => onRouteChange('register')} className="f4 link dim black db pointer">Sign up</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;