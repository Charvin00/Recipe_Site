const express = require('express');
const app = express();
const PORT = 5000;

let users= {
    Amit: true,
    Bao: true
  };

let messages = [
    {
      sender: 'Amit',
      timestamp: new Date(),
      text: "I am really enjoying React!"
    },
    {
      sender: 'Bao',
      timestamp: new Date(),
      text: "Me too!"
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