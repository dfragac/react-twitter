import React, {Component} from 'react'
import Firebase from 'firebase'
import {HashRouter, Match} from 'react-router'
import 'normalize-css'

import styles from './styles.css'
import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    })
  }

  handleOnAuth () {
    const provider = new Firebase.auth.GithubAuthProvider()

    Firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha inciado sesión`))
    .catch(error => console.error(`Error ${error.code}: ${error.message}`))
  }

  handleLogout () {
    Firebase.auth().signOut()
    .then(() => console.log('Te has desconectado correctamente!'))
    .catch(() => console.log('Ups! Algo malo ha pasado en el deslogueo'))
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Header />

          <Match exactly pattern='/' render={() => {
            if (this.state.user) {
              return (
                <Main
                  user={this.state.user}
                  onLogout={this.handleLogout}
                />
              )
            } else {
              return (
                <Login onAuth={this.handleOnAuth} />
              )
            }
          }} />

          <Match pattern='/profile' render={() => {
            return (
              <Profile
                picture={this.state.user.photoURL}
                userName={this.state.user.email.split('@')[0]}
                displayName={this.state.user.displayName}
                location={this.state.user.location}
                emailAddress={this.state.user.email}
              />
            )
          }} />

          <Match pattern='/user/:username' render={({params}) => {
            return (
              <Profile
                displayName={params.username}
                userName={params.username}
              />
            )
          }} />

        </div>
      </HashRouter>
    )
  }
}

export default App
