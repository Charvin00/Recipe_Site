import React from 'react';

class Pop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //   msgId: this.props.data
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // const msgId = e.target
    this.props.click(this.props.back);
  }
  render() {
    return (
          <div className="message" >
          <div className="meta-info" >
            <div className="sender-info">
              <span className="username">{this.props.message.sender}</span>
            </div>
            <div className="message-info">
              <span className="timestamp">{this.props.message.timestamp.toString()}</span>
            </div>
          </div>
          <p className="message-text">{this.props.message.text}</p>
          <button onClick={this.handleClick}>Go Back</button>
        </div>
        );
  
  }
}
export default Pop;