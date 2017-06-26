import Firebase from 'firebase'
import React from 'react'
import {render} from 'react-dom'

Firebase.initializeApp({
  apiKey: 'YOUR-KEY',
  authDomain: 'YOUR-DOMAIN',
  databaseURL: 'YOUR-BASE-URL',
  storageBucket: 'YOUR-STORAGE',
  messagingSenderId: 'YOUR-ID'
})

import App from './components/App'

render(<App />, document.getElementById('root'))
