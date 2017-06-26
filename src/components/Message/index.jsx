import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import moment from 'moment'

import styles from './styles.css'

const propTypes = {
  userName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  numRetweets: PropTypes.number.isRequired,
  numFavourites: PropTypes.number.isRequired,
  onFavourite: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired
}

class Message extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pressFavourite: false,
      pressRetweet: false
    }

    this.onPressRetweet = this.onPressRetweet.bind(this)
    this.onPressFavourite = this.onPressFavourite.bind(this)
  }

  onPressFavourite () {
    this.props.onFavourite()

    this.setState({
      pressFavourite: true
    })
  }

  onPressRetweet () {
    this.props.onRetweet()

    this.setState({
      pressRetweet: true
    })
  }

  render () {
    let dateFormat = moment(this.props.date).fromNow()
    let userLink = `/user/${this.props.userName}`

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <Link to={userLink}>
            <figure>
              <img className={styles.avatar} src={this.props.picture} />
            </figure>
          </Link>
          <span className={styles.displayName}>{this.props.displayName}</span>
          <span className={styles.userName}>{this.props.userName}</span>
          <span className={styles.date}>{dateFormat}</span>
        </div>
        <h3>{this.props.text}</h3>
        <div className={styles.buttons}>
          <div
            className={styles.icons}
            onClick={this.props.onReplyTweet}
          >
            <span className='fa fa-reply' />
          </div>
          <div
            className={(this.state.pressRetweet) ? styles.rtGreen : styles.icons}
            onClick={this.onPressRetweet}
          >
            <span className='fa fa-retweet' />
            <span className={styles.num}>{this.props.numRetweets}</span>
          </div>
          <div
            className={(this.state.pressFavourite) ? styles.fvYellow : styles.icons}
            onClick={this.onPressFavourite}
          >
            <span className='fa fa-star' />
            <span className={styles.num}>{this.props.numFavourites}</span>
          </div>
        </div>
      </div>
    )
  }
}

Message.propTypes = propTypes

export default Message
