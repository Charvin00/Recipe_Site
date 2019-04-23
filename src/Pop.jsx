import React from 'react';

class Pop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   msgId: this.props.data
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // go back button click function, calls parent component back home function
  handleClick(e) {
    // const msgId = e.target
    this.props.click(this.props.back);
  }
  render() {
    return (

      <div className="pop recipe" >
        <picture></picture>

        <div className="recipe-info">
          <h2 className="title">{this.props.curRecipe.title}</h2>
          <div className="small-info">
            <p className="timestamp">By: {this.props.curRecipe.sender}</p>
            <p className="recipe-text">{this.props.curRecipe.text}</p>
          </div>
        </div>
        <button className="message-button" onClick={this.handleClick}>Go Back</button>
      </div>

    );

  }
}
export default Pop;