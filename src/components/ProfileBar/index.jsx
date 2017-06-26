import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './styles.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onOpenText: PropTypes.func.isRequired
}

function ProfileBar ({picture, userName, onOpenText, onLogout}) {
  return (
    <div className={styles.root}>
      <Link to='/profile'>
        <figure>
          <img className={styles.avatar} src={picture} />
        </figure>
      </Link>
      <span className={styles.username}>Hola @{userName}!</span>
      <button onClick={onOpenText} className={styles.button}>
        <span className='fa fa-lg fa-edit' /> Tweet
      </button>
      <button onClick={onLogout} className={styles.button}>
        <span className='fa fa-sign-out' /> Salir
      </button>
    </div>
  )
}

ProfileBar.propTypes = propTypes

export default ProfileBar
