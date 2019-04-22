import React from 'react';
import Message from './Message';

// const Messages = ({ messages }) => {
  // const messageList = messages.map( message => (
  //   <li key={message.text}>
  //     <Message message={message} />
  //   </li>
  // ));
  // return (
  //   <ol className="messages">
  //     {messageList}
  //   </ol>
  // );
// };

// export default Messages;

//====================
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.click(e);
  }
  render() {
    const messageList = this.props.messages.map( message => (
      <li key={message.id}>
        <Message message={message} click={this.handleClick} data={message.id} />
      </li>
    ));
    return (
      <div display-message>
        <ol className="messages">
          {messageList}
        </ol>
      </div>
      
    );
  
  }
}
export default Messages;