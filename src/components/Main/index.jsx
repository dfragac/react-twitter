import React, {Component, PropTypes} from 'react'
import Firebase from 'firebase'
import uuid from 'uuid'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: Object.assign({}, this.props.user, {retweets: []}, {favourites: []}),
      openText: false,
      userNameToReply: '',
      messages: [
      ]
    }

    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavourite = this.handleFavourite.bind(this)
    this.handleReplyTweet = this.handleReplyTweet.bind(this)
  }

  componentWillMount () {
    const messagesRef = Firebase.database().ref().child('messages')

    messagesRef.on('child_added', snapshot => {
      this.setState({
        messages: this.state.messages.concat(snapshot.val()),
        openText: false
      })
    })
  }

  handleSendText (event) {
    event.preventDefault()

    let newMessage = {
      id: uuid.v4(),
      userName: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      date: Date.now(),
      picture: this.props.user.photoURL,
      text: event.target.text.value,
      retweets: 0,
      favourites: 0
    }

    const messageRef = Firebase.database().ref().child('messages')
    const messageId = messageRef.push()
    messageId.set(newMessage)
  }

  handleOpenText (event) {
    event.preventDefault()
    this.setState({ onOpenText: true })
  }

  handleCloseText (event) {
    event.preventDefault()
    this.setState({ onOpenText: false })
  }

  handleReplyTweet (msgId, userNameToReply) {
    this.setState({
      onOpenText: true,
      userNameToReply: userNameToReply
    })
  }

  renderOpenText () {
    if (this.state.onOpenText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          userNameToReply={this.state.userNameToReply}
        />
      )
    }
  }

  handleRetweet (msgId) {
    let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId)

    if (alreadyRetweeted.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets++
        }
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.retweets.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  handleFavourite (msgId) {
    let alreadyFavourited = this.state.user.favourites.filter(fav => fav === msgId)

    if (alreadyFavourited.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favourites++
        }
        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.favourites.push(msgId)

      this.setState({
        messages,
        user
      })
    }
  }

  render () {
    return (
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          userName={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
          onLogout={this.props.onLogout}
        />
        {this.renderOpenText()}
        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavourite={this.handleFavourite}
          onReplyTweet={this.handleReplyTweet}
        />
      </div>
    )
  }
}

Main.propTypes = propTypes

export default Main
