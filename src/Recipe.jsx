import React from 'react';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // const msgId = e.target
    this.props.click(this.props.data);
  }
  render() {
    return (

      <div className="message" >
        <picture></picture>
        <div className="recipe-info">
          <h2 className="title">{this.props.recipe.title}</h2>
          <div className="small-info">
            <p className="sender timestamp">By: {this.props.recipe.sender}</p>
            <p className="timestamp">{this.props.recipe.timestamp.toString()}</p>
          </div>
        </div>



        <button className="message-button" onClick={this.handleClick}>Try Me!</button>
      </div>

    );

  }
}
export default Recipe;