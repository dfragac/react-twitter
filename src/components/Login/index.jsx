import React, {PropTypes} from 'react'

import style from './styles.css'

const propTypes = {
  onAuth: PropTypes.func.isRequired
}

function Login ({onAuth}) {
  return (
    <div className={style.root}>
      <p className={style.text}>
        Necesitamos que inicies sesión con tu cuenta de GitHub para que puedas leer y escribir mensajes
      </p>
      <button
        onClick={onAuth}
        className={style.button}
      >
        <span className='fa fa-github' /> Login on GitHub
      </button>
    </div>
  )
}

Login.propTypes = propTypes

export default Login
