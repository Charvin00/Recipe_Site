const express = require('express');
const app = express();
const PORT = 5000;

let users= {
    Apple: true,
    Banana: true
  };

let messages = [
    {
      sender: 'Apple',
      timestamp: new Date(),
      text: "choose the red one, really red one!!"
    },
    {
      sender: 'banana',
      timestamp: new Date(),
      text: "peel them first, then eat"
    },
    {
      sender: 'hotPot',
      timestamp: new Date(),
      text: "Heat up the pot, and then put meat in it!"
    }
  ];
  let isLoggedIn = false;

app.get('/newMessage', express.json(), (req, res) =>  {
    res.json({users, messages});
});

app.post('/postMessage', express.json(), (req, res) =>  {
  const { message } = req.body;
  console.log(message);
  if(!message) {
    res.status(400).json({error:`text' property are required`});
  }
  else {
    
    messages.push(message);
    res.json({message})
  }

});

//post user
app.post('/postUser', express.json(), (req, res) =>  {
  const {user}  = req.body;
  console.log("test new user: " + user.name);
  if(!user) {
    res.status(400).json({error:`text' property are required`});
  }
  else {
     // already exist, or new user, response logged in to be true
    // new user log in, add to users list; 
    users[user.name] = true;;
    // console.log(users)
    isLoggedIn = true;
    res.json({user, isLoggedIn})
  }

});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));