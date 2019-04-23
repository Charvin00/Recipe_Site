import React from 'react';


class Outgoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      buttonShow: {
        visibility: 'hidden',
      },
      inputTitle: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleTitleChange(event) {
    this.setState({
      inputTitle: event.target.value
    }, () => {
      if(this.state.inputTitle) {
        this.setState({
          buttonShow: false
        });
      } else{
        this.setState({
          buttonShow: true
        })
      }
    });
  }

  handleTextChange(event) {
    this.setState({
      inputText: event.target.value
    }, () => {
      if(this.state.inputText) {
        this.setState({
          buttonShow: false
        });
      } else{
        this.setState({
          buttonShow: true
        })
      }
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    
    if(this.state.inputText && this.state.inputTitle) {
      const newMessage = {
        sender: this.props.curUser,
        title: this.state.inputTitle,
        timestamp: new Date(),
        text: this.state.inputText,
        id: ''
      }

      this.props.send(newMessage);
      this.resetInput();
      // alert(newMessage.text + " " + newMessage.sender)
      this.props.click(this.props.back);
    }
  }

  // reset input box after sumbit;
  resetInput() {
    this.setState({
      inputText: "",
      buttonShow: true
    });
  }

  handleClick(e) {
    // const msgId = e.target
    this.props.click(this.props.back);
  }

  render() {
    return (
      <div className="outgoing">
      <form className="outgoing-form" onSubmit={this.handleSubmit}>
        <label className="outgoing-input">
          New Message :
          <input type="title" value={this.state.inputTitle} onChange={this.handleTitleChange}  placeholder="What dish we are doing today?" />
          <input type="text" value={this.state.value} onChange={this.handleTextChange}  placeholder="How to do it?" />
        </label>
        <button id="xxx" className="login-button" disabled={this.state.buttonShow} type="submit">Share Your Cusine Today!</button>
      </form>
      <button onClick={this.handleClick}>Go Back</button>
      </div>
      
    );
  }
}

export default Outgoing;

