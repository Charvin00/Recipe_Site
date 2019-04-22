import React from 'react';

class Outgoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      buttonShow: {
        visibility: 'hidden',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  handleChange(event) {
    this.setState({
      userName: event.target.value
    }, () => {
      if(this.state.userName) {
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
    
    if(this.state.userName) {
        const newUser = {
            name: this.state.userName
        }
      this.props.send(newUser);
      this.resetInput();
    }
  }

  // reset input box after sumbit;
  resetInput() {
    this.setState({
      userName: "",
      buttonShow: true
    });
  }

  render() {
    return (
        <div>
            <h1 className="login-header">Who is the Chief Today?</h1>
            <form className="login-form" onSubmit={this.handleSubmit}>
              {/* <div> */}
              <input type="text" value={this.state.userName} onChange={this.handleChange} placeholder="Enter your name here"/>
              {/* </div> */}
              {/* <div> */}
              <button id="xxx" className="login-button" disabled={this.state.buttonShow} type="submit">Log In</button>
              {/* </div> */}
          </form>
        </div>
    );
  }
}

export default Outgoing;

