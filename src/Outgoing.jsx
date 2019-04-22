import React from 'react';


class Outgoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sender:'',
      buttonShow: {
        visibility: 'hidden',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetInput = this.resetInput.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   this.props.click(this.state.value);
  // }

  handleChange(event) {
    this.setState({
      value: event.target.value
    }, () => {
      if(this.state.value) {
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
    
    if(this.state.value) {
      const newMessage = {
        sender: '',
        timestamp: new Date(),
        text: this.state.value,
        id: ''
      }

      this.props.send(newMessage);
      this.resetInput();
    }
  }

  // reset input box after sumbit;
  resetInput() {
    this.setState({
      value: "",
      buttonShow: true
    });
  }

  render() {
    return (
      <div className="outgoing">
      <form className="outgoing-form" onSubmit={this.handleSubmit}>
        <label className="outgoing-input">
          New Message :
          <input type="text" value={this.state.value} onChange={this.handleChange}  placeholder="Enter message to send" />
        </label>
        {/* <button id="xxx" className="login-button" disabled={this.state.buttonShow} type="submit">Submit</button> */}
      </form>
      </div>
    );
  }
}

export default Outgoing;

