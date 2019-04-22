import React from 'react';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      buttonShow: {
        visibility: 'hidden',
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  componentDidMount() {
      if(this.props.curUser) {
        this.setState({
            buttonShow: {
                visibility: 'visible'
            }
          });
      }
      else {
        this.setState({
            buttonShow: {
                visibility: 'hidden'
            }
          })
      }
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    this.props.send();
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
            <button onClick={this.handleSubmit} className="login-button" style={this.state.buttonShow} >Log Out</button>
        </div>
    );
  }
}

export default LogOut;

