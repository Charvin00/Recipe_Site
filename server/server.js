const express = require('express');
const app = express();
const PORT = 5000;

let users = {
  Ramsey: true,
  Shen: true
};

let recipes = [
  {
    sender: 'Ramsey',
    title: 'Apple',
    timestamp: new Date(2018, 3, 24, 12, 0, 0, 0),
    text: "choose the red one, really red one!!",
    id: 0
  },
  {
    sender: 'Shen',
    title: 'banana',
    timestamp: new Date(2019, 0, 20, 12, 0, 0, 0),
    text: "peel them first, then eat",
    id: 1
  },
  {
    sender: 'Ramsey',
    title: 'hotPot',
    timestamp: new Date(2019, 3, 21, 12, 0, 0, 0),
    text: "Heat up the pot, and then put meat in it!",
    id: 2
  }
];
let isLoggedIn = false;


// ==============recipe rest calls:=============

// fetch recipe list
app.get('/new-recipe', express.json(), (req, res) => {
  res.json({ users, recipes });
});

// add new recipe user inputed
app.post('/post-recipe', express.json(), (req, res) => {
  const { recipe } = req.body;
  console.log(recipe);
  if (!recipe) {
    res.status(400).json({ error: `text' property are required` });
  }
  else {
    recipe.id = recipes.length;
    recipes.push(recipe);
    res.json({ recipe })
  }

});

//fetch selected recipe
app.post('/fetch-recipe', express.json(), (req, res) => {
  let rcpId = req.body.recipeId;
  rcpId = parseInt(rcpId, 10)
  if (rcpId === null) {
    res.status(400).json({ error: `text' property are required` });
  }
  else {
    console.log(rcpId)
    const curRecipe = recipes[rcpId]

    // set time out to let spinner loading 3 sec
    setTimeout(() => {
      res.json({ curRecipe })
    }, 3000);
  }

});


// ==============user rest calls:=============

//post user
app.post('/post-user', express.json(), (req, res) => {
  const { user } = req.body;
  console.log("test new user: " + user.name);
  if (!user) {
    res.status(400).json({ error: `text' property are required` });
  }
  else {
    // already exist, or new user, response logged in to be true
    // new user log in, add to users list; 
    users[user.name] = true;
    // console.log(users)
    isLoggedIn = true;
    res.json({ user, isLoggedIn })
  }
});

//delete user
app.post('/delete-user', express.json(), (req, res) => {
  const { user } = req.body;
  console.log("delete new user: " + user.name);
  if (!user) {
    res.status(400).json({ error: `text' property are required` });
  }
  else {
    // already exist, or new user, response logged in to be true
    // new user log in, add to users list; 
    delete users[user.name];
    isLoggedIn = false;
    res.json({ users, isLoggedIn })
  }
});



app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));