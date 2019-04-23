import React from 'react';

// const Message = ({ message }) => {
  
//   return (
//     <div className="message">
//     <div className="meta-info" >
//       <div className="sender-info">
//         <span className="username">{message.sender}</span>
//       </div>
//       <div className="message-info">
//         <span className="timestamp">{message.timestamp.toString()}</span>
//       </div>
//     </div>
//     <p className="message-text">{message.text}</p>
//   </div>
//   );
  
// };

// export default Message;

//====================
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // msgId: this.props.data
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // const msgId = e.target
    this.props.click(this.props.data);
  }
  render() {
    return (

      <div className="message" >
            <picture></picture>
              <div className="message-info">
                <h2 className="title">{this.props.message.title}</h2>
                  <div className="small-info">
                  <p className="timestamp">By: {this.props.message.sender}</p>
                  {/* <p className="message-text">{this.props.message.text}</p> */}
                  <p className="timestamp">{this.props.message.timestamp.toString()}</p>
                </div>
              </div>
              
            
            
            <button className="message-button" onClick={this.handleClick}>Try Me!</button>
        </div>
         
        );
  
  }
}
export default Message;