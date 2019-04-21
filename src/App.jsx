import React, { Component } from 'react';
import Users from './Users';
import Messages from './Messages';
import Outgoing from './Outgoing';
import { newUser, getMessage, newMessage } from './services';
import Login from './Login.jsx';
import ErrorMessage from './Error.jsx';

import './chat.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      value:'',
      users:  {},
      curUser: '', //current user
      //message list:
      messages: [],
      isLoggedIn: false,
      error:''
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.logUser = this.logUser.bind(this);
  };
  
  myClick = () => {
    alert('hello world')
  }
  updateMessage = () => {
    getMessage().then( result => {
      // console.log(result);
      this.setState({
        error: '',
        messages: result.messages,
        users: result.users,
      })
    })
    //for error message:
    .catch( result => {
      // console.log(result.code)
      //update error message,

      this.setState({
        error: [result.code]
      })
    })
  }
  
  sendMessage(message){
    message.sender = this.state.curUser;
    newMessage(message).then(result => {
      this.setState({
        messages: [...this.state.messages, result.message],
      })
    })
  }
  
  logUser(user){
    newUser(user).then(result => {
      this.setState({
        users: {...this.state.users, [result.user.name]:true},
        
        isLoggedIn: result.isLoggedIn,
        curUser: result.user.name
      })
      setInterval(this.updateMessage, 5000);
    })
  }


  

  //====== page call back: =====
  render() {
    if(this.state.isLoggedIn) {
      
      return (
        <div className="chat-app">
          <h1 className="header">Shen's Bread</h1>
          <div className="display-panel">
            <Users users={this.state.users}/>
            <Messages messages={this.state.messages} curUser={this.state.curUser}  />
            <Outgoing send={this.sendMessage} click={this.myClick}/>
          </div>
          <ErrorMessage error = {this.state.error}/>
        </div>
      );
    }
    else {
      //go to login page
      return(      
        <div className="login">
          <Login send={this.logUser}/>
          <ErrorMessage error={this.state.error}/>
        </div>
      );
      
    }
    
  }
}

export default App;
