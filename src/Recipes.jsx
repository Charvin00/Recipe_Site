import React from 'react';
import Recipe from './Recipe';

//====================
class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.click(e);
  }
  render() {
    const recipeList = this.props.recipes.map(recipe => (
      <section key={recipe.text}>
        <Recipe recipe={recipe} click={this.handleClick} data={recipe.id} />
      </section>
    ));
    return (

      <div className="recipes">
        {recipeList}
      </div>


    );

  }
}
export default Recipes;