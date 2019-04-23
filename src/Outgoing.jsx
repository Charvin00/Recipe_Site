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
      if (this.state.inputTitle && this.state.inputText) {
        this.setState({
          buttonShow: false
        });
      } else {
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
      if (this.state.inputText && this.state.inputTitle) {
        this.setState({
          buttonShow: false
        });
      } else {
        this.setState({
          buttonShow: true
        })
      }
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    if (this.state.inputText && this.state.inputTitle) {
      const newRecipe = {
        sender: this.props.curUser,
        title: this.state.inputTitle,
        timestamp: new Date(),
        text: this.state.inputText,
        id: ''
      }
      this.props.send(newRecipe);
      this.resetInput();

      this.props.click(this.props.back);
    }
  }

  // reset input box after sumbit;
  resetInput() {
    this.setState({
      inputText: "",
      buttonShow: true,
      inputTitle: ""
    });
  }

  handleClick(e) {
    this.props.click(this.props.back);
  }

  render() {
    return (
      <div className="outgoing">
        <span className="outgoing-input">
          What dish we are doing today?
      </span>
        <div className="container title-input">

          <input className="input" type="title" value={this.state.inputTitle} onChange={this.handleTitleChange} placeholder="What dish we are doing today?" />
          <span className="border"></span>
        </div>

        <div className="container title-text">
          <input className="input" type="text" value={this.state.value} onChange={this.handleTextChange} placeholder="How to do it?" />
          <span className="border"></span>
        </div>

        <div className="log-button">
          <button className="login-button" disabled={this.state.buttonShow} onClick={this.handleSubmit}>Share It</button>
        </div>

        <button onClick={this.handleClick}>Go Back</button>
      </div>

    );
  }
}

export default Outgoing;

