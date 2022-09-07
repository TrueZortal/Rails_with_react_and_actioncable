import React from 'react';
import ActionCable  from 'actioncable';

// const ActionCablenator = () => {
//   return <ActionCable
//           channel={{ channel: "MessagesChannel" }}
//           onReceived={this.handleReceivedMessages}
//         />
// }
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.cable = ActionCable.createConsumer('ws://localhost:3000/cable')
    console.log("connection established")
  }

  componentDidMount() {
    this.fetchMessages()
    this.createSubscription()
    console.log("component mounted, subscription created")

  };

  fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then(messages => this.setState({ messages: messages }))
    console.log("messages fetched")

  }

  createSubscription = () => {
    this.cable.subscriptions.create(
      { channel: 'MessagesChannel' },
      { received: message => this.handleReceivedMessage(message) }
    )
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) =>
      <li key={i}>{message.content}</li>)
  }

  handleReceivedMessage = (message) => {
    if (message === 'delete_all') {
      this.setState({ messages: [] })
    } else if (message === null) {
    } else {
      this.setState({ messages: [...this.state.messages, message] })
    }
  }

  handleMessageSubmit = e => {
    e.preventDefault();
    console.log("submitted a message")
    const messageObj = {
      message: {
        content: e.target.message.value
      }
    }
    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObj)
    }
    fetch('http://localhost:3000/messages', fetchObj)
    e.target.reset()
  }

  resetMessages = e => {
    e.preventDefault();
    console.log("resetting, no really!")
    fetch('http://localhost:3000/reset')
  }

  render() {
    return (
      <div className='App'>
        <ul>{this.mapMessages()}</ul>
        <form onSubmit={this.handleMessageSubmit}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form>

        <button onClick = {this.resetMessages.bind(this)}>Reset</button>
      </div>
    );
  }
}
export default App;