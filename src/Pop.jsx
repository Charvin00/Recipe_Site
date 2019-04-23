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

       <div className="pop message" >
            <picture></picture>
            
            <div className="message-info">
              {/* <div className="sender-info">
                <span className="username">{this.props.message.sender}</span>
              </div> */}
              <h2 className="title">{this.props.message.title}</h2>
                <div className="small-info">
                <p className="timestamp">By: {this.props.message.sender}</p>
                <p className="message-text">{this.props.message.text}</p>
                {/* <p className="timestamp">{this.props.message.timestamp.toString()}</p> */}
              </div>
            </div>
            <button  className="message-button" onClick={this.handleClick}>Go Back</button>
        </div>
        
        );
  
  }
}
export default Pop;