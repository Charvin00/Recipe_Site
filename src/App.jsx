import React, { Component } from 'react';
import Users from './Users';
import Messages from './Messages';
import Outgoing from './Outgoing';
import { newUser, deleteUser, fetchMessage, getMessage, newMessage } from './services';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import ErrorMessage from './Error.jsx';
import Pop from './Pop.jsx';
import spinner from './spinner.gif';

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
      error:'',
      curMessage: '',
      goFetch: true,
      interval: 0,
      pop: false,
      waiting: false,
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.logUser = this.logUser.bind(this);
    this.outUser = this.outUser.bind(this);
    this.myClick = this.myClick.bind(this);
    this.timeDifference = this.timeDifference.bind(this);
  };
  
  
  updateMessage = () => {
    getMessage().then( result => {
      // console.log(result.messages);

      result.messages.map( message => {
        // console.log(message.timestamp) 
        // let cur = new Date()
        let cur = new Date()
        let msgT = new Date(message.timestamp)
        let temp = this.timeDifference(cur , msgT);
        message.timestamp = temp; 
        
      })

      // for (let message in result.messages) {
      //   console.log(message)
      //   let temp = this.convertTime(message.timestamp);
      //   message.timeStamp = temp;
        
      // }
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
  
  // new message was somehow added twice problem next!!!!!!! 
  // cause duplicate key of two children
  sendMessage(message){
    message.sender = this.state.curUser.name;
    // this.setState({
    //   waiting: true
    // }, () => {
      newMessage(message).then(result => {
        console.log('show spinner')
        this.setState({
          messages: [...this.state.messages, result.message],
          waiting: false
        })
      })
      .catch( result => {
        // console.log(result.code)
        //update error message,
  
        this.setState({
          error: [result.code]
        })
      })
    // })
    
  }

  // convert time stamp to relative time
   timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    let elapsed = current - previous;
    // console.log(elapsed)

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

  componentDidMount() {
    if(this.state.isLoggedIn && this.state.goFetch) {
      this.interval = setInterval(this.updateMessage, 5000);
    }
    //  else {
    //   clearInterval(this.interval)
    // }

  }
  
  logUser(user){
    newUser(user).then(result => {
      this.setState({
        users: {...this.state.users, [result.user.name]:true},
        isLoggedIn: result.isLoggedIn,
        curUser: result.user,
        goFetch: true,
      }) 
    })
    .then( () => {
      // if(this.state.isLoggedIn && this.state.goFetch) {
      //   // timer = setInterval(this.updateMessage, 5000);
      // }
      this.componentDidMount()
    })
    .catch( result => {
      // console.log(result.code)
      //update error message,

      this.setState({
        error: [result.code]
      })
    })
  }

  // Log out user
  outUser(){
    deleteUser(this.state.curUser).then(result => {
      // alert(this.state.curUser.name)
      this.setState({
        users: result.users,
        isLoggedIn: result.isLoggedIn,
        curUser: {},
        // goFetch: true,
      }) 
    })
    .then( () => {
      // if(this.state.isLoggedIn && this.state.goFetch) {
      //   // timer = setInterval(this.updateMessage, 5000);
      // }
      this.componentDidMount()
    })
    .catch( result => {
      // console.log(result.code)
      //update error message,

      this.setState({
        error: [result.code]
      })
    })
  }

  // passing in msgId from message selected
  myClick = (alertMessage) => {
    // alert(alertMessage);
    this.setState({
      waiting: true
    }, () => {
      fetchMessage(alertMessage).then(result => {
      
        this.setState({
          curMessage: result.curMessage,
          pop: true,
          waiting: false
          // goFetch: false
        })
      }).then(() => {
        // alert(this.state.goFetch);
        clearInterval(this.interval)
      })
      .catch( result => {
        // console.log(result.code)
        //update error message,
  
        this.setState({
          error: [result.code]
        })
      })
    })
    
    
  }
  backHome = () => {
    this.setState({
      pop: false
    })
  }


  

  //====== page call back: =====
  render() {

    if(this.state.isLoggedIn) {
      if(!this.state.pop) {
        return (
          <div className="chat-app">
            <div className="header-container">
               <h1 className="header">Shen's Bread</h1>
            </div>
            
            <div className="display-panel">
              <Users users={this.state.users}/>
              {this.state.waiting ? <img alt="waiting" src={spinner} className="spinner"/> :
                <Messages messages={this.state.messages} click={this.myClick}  />
              }
            </div>
            <Outgoing send={this.sendMessage} />
            <Logout send={this.outUser} curUser={this.state.curUser} />
            <ErrorMessage error = {this.state.error}/>
          </div>
        );
      } 
      else {
        // if selected pop:
        return(
          <div className="chat-app">
            <h1 className="header">Shen's Bread</h1>
            <div className="display-panel">
              <Users users={this.state.users}/>
              <Pop message={this.state.curMessage} click={this.backHome} />
              {/* <Outgoing send={this.sendMessage} /> */}
            </div>
            <ErrorMessage error = {this.state.error}/>
        </div>
        )
      }
      
    }
    // if not logged in: 
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
