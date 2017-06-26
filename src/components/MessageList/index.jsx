import React, {PropTypes} from 'react'

import styles from './styles.css'
import Message from '../Message'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onReplyTweet: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavourite: PropTypes.func.isRequired
}

function MessageList ({messages, onRetweet, onFavourite, onReplyTweet}) {
  return (
    <div className={styles.root}>
      {messages.map(msg => {
        return (
          <Message
            key={msg.id}
            text={msg.text}
            picture={msg.picture}
            displayName={msg.displayName}
            userName={msg.userName}
            date={msg.date}
            numRetweets={msg.retweets}
            numFavourites={msg.favourites}
            onRetweet={() => onRetweet(msg.id)}
            onFavourite={() => onFavourite(msg.id)}
            onReplyTweet={() => onReplyTweet(msg.id, msg.userName)}
          />
        )
      }).reverse()}
    </div>
  )
}

MessageList.proptypes = propTypes

export default MessageList
