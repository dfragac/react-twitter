import React, {PropTypes} from 'react'

import styles from './styles.css'

const propTypes = {
  userName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}

function Profile ({userName, displayName, emailAddress, location, picture}) {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={picture} />
      <span className={styles.name}>{displayName}</span>
      <ul className={styles.data}>
        <li>
          <span className='fa fa-user' /> {userName}
        </li>
        <li>
          <span className='fa fa-envelope' />{emailAddress}
        </li>
        <li>
          <span className='fa fa-map-marker' />{location}
        </li>
      </ul>

    </div>
  )
}

Profile.propTypes = propTypes

export default Profile
