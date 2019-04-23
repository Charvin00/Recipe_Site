import React, { Component } from 'react';
import Recipes from './Recipes';
import Outgoing from './Outgoing';
import { newUser, deleteUser, fetchRecipe, getRecipe, newRecipe } from './services';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import ErrorMessage from './Error.jsx';
import Pop from './Pop.jsx';
import spinner from './spinner.gif';
import Logo from './logo.png';
import './chat.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: {},
      curUser: '', //current user
      recipes: [], //recipes list:
      isLoggedIn: false,
      error: '',
      curRecipe: '',
      goFetch: true,
      interval: 0,
      pop: false,
      waiting: false,
      outGoing: false,
    };
    this.updateRecipes = this.updateRecipes.bind(this);
    this.sendRecipe = this.sendRecipe.bind(this);
    this.logUser = this.logUser.bind(this);
    this.outUser = this.outUser.bind(this);
    this.clickPop = this.clickPop.bind(this);
    this.timeDifference = this.timeDifference.bind(this);
    this.handleOutGoing = this.handleOutGoing.bind(this);
  };

  /*  ========= recipes functions ============ */

  // update recipe list by fetching from server
  updateRecipes = () => {
    getRecipe().then(result => {
      result.recipes.map(recipe => {
        let cur = new Date()
        let msgT = new Date(recipe.timestamp)
        let temp = this.timeDifference(cur, msgT);
        recipe.timestamp = temp;
        return ('');
      })
      this.setState({
        error: '',
        recipes: result.recipes,
        users: result.users,
      })
    })
      //for error message:
      .catch(result => {
        this.setState({
          error: [result.code]
        })
      })
  }

  // sending out recipe
  sendRecipe(recipe) {
    console.log(recipe)
    newRecipe(recipe).then(result => {
      console.log('show spinner')
      this.setState({
        recipes: [...this.state.recipes, result.recipe],
        waiting: false
      })
    })
      .catch(result => {
        this.setState({
          error: [result.code]
        })
      })
  }

  // convert time stamp to relative time
  timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  // auto polling data every 5 second
  componentDidMount() {
    this.interval = setInterval(this.updateRecipes, 5000);
  }

  // log in user
  logUser(user) {
    // loading spinner after log in
    this.setState({
      waiting: true
    }, () => {
      newUser(user).then(result => {
        this.setState({
          users: { ...this.state.users, [result.user.name]: true },
          isLoggedIn: result.isLoggedIn,
          curUser: result.user,
          goFetch: true,
        })
      })
        .then(() => {
          this.componentDidMount();
          // set time out to let spinner loading 5 sec
          setTimeout(() => {
            this.setState({
              waiting: false
            })
          }, 5000);
        })
        .catch(result => {
          this.setState({
            error: [result.code]
          })
        })
    })

  }

  // Log out user
  outUser() {
    deleteUser(this.state.curUser).then(result => {
      this.setState({
        users: result.users,
        isLoggedIn: result.isLoggedIn,
        curUser: {},
      })
    })
      .then(() => {
        this.componentDidMount()
      })
      .catch(result => {
        this.setState({
          error: [result.code]
        })
      })
  }

  // passing in recipeId from recipe selected
  clickPop = (curMsg) => {
    // loading spinner after desired recipe
    this.setState({
      waiting: true
    }, () => {
      fetchRecipe(curMsg).then(result => {
        this.setState({
          curRecipe: result.curRecipe,
          pop: true,
          waiting: false
        })
      }).then(() => {
        clearInterval(this.interval)
      })
        .catch(result => {
          this.setState({
            error: [result.code]
          })
        })
    })


  }

  // back to home button function
  backHome = () => {
    this.setState({
      pop: false,
      outGoing: false
    })
  }

  // display add new recipe page
  handleOutGoing() {
    this.setState({
      outGoing: true
    })
  }

  //====== page call back: =====
  render() {

    if (this.state.isLoggedIn) {
      if (!this.state.pop && !this.state.outGoing) {
        // browse page:
        return (
          <div className="chat-app">
            <div className="header-container">
              <div className="logo">
                <div className="home header" href="" onClick={this.backHome}>
                  <img alt="logo" src={Logo} />
                </div>
              </div>
              <p className="logged-user">Welcome {this.state.curUser.name}</p>
            </div>
            {this.state.waiting ?
              <img alt="waiting" src={spinner} className="spinner" />
              :
              <div className="display-panel">
                <Recipes recipes={this.state.recipes} click={this.clickPop} />
                <button id="share-button" onClick={this.handleOutGoing}>Share Your Cusine Today!</button>
                <Logout send={this.outUser} curUser={this.state.curUser} />
              </div>
            }
            <ErrorMessage error={this.state.error} />
          </div>

        );
      }
      else if (this.state.pop) {
        // if selected pop:
        return (
          <div className="chat-app">
            <div className="header-container">
              <div className="logo">
                <div className="home header" onClick={this.backHome}>
                  <img alt="logo" src={Logo} />
                </div>
              </div>
            </div>
            <div className="display-panel">
              <Pop curRecipe={this.state.curRecipe} click={this.backHome} />
            </div>
            <ErrorMessage error={this.state.error} />
          </div>
        )
      }
      else if (this.state.outGoing) {
        // outGoing page:
        return (
          <div className="chat-app">
            <div className="header-container">
              <div className="logo">
                <a className="home header" onClick={this.backHome}>
                  <img alt="logo" src={Logo} />
                </a>
              </div>
            </div>
            <div className="display-panel">
              <Outgoing send={this.sendRecipe} click={this.backHome} curUser={this.state.curUser.name} />
            </div>
            <ErrorMessage error={this.state.error} />
          </div>
        )

      }

    }
    // if not logged in: 
    else {
      //go to login page
      return (
        <div className="login">
          <Login send={this.logUser} />
          <ErrorMessage error={this.state.error} />
        </div>
      );

    }

  }
}

export default App;
