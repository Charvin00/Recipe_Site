import React from 'react';

const Message = ({ message }) => {
  
  return (
    <div className="message">
    <div className="meta-info" >
      <div className="sender-info">
        <span className="username">{message.sender}</span>
      </div>
      <div className="message-info">
        <span className="timestamp">{message.timestamp.toString()}</span>
      </div>
    </div>
    <p className="message-text">{message.text}</p>
  </div>
  );
  
};

export default Message;

//================
// class Outgoing extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//       sender:'',
//       buttonShow: {
//         visibility: 'hidden',
//       }
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(event) {
//     // alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
    
//     if(this.state.value) {
//       const newMessage = {
//         sender: '',
//         timestamp: new Date(),
//         text: this.state.value
//       }

//       this.props.send(newMessage);
//       this.resetInput();
//     }
//   }
//   render() {
//     return (
//       <div className="message" onClick={this.handleSubmit}>
//       <div className="meta-info" >
//         <div className="sender-info">
//           <span className="username">{message.sender}</span>
//         </div>
//         <div className="message-info">
//           <span className="timestamp">{message.timestamp.toString()}</span>
//         </div>
//       </div>
//       <p className="message-text">{message.text}</p>
//     </div>
//     );
//   }
// }