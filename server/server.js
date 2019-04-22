const express = require('express');
const app = express();
const PORT = 5000;

let users= {
    Ramsey: true,
    Shen: true
  };

let messages = [
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

app.get('/new-message', express.json(), (req, res) =>  {
    res.json({users, messages});
});

app.post('/post-message', express.json(), (req, res) =>  {
  const { message } = req.body;
  console.log(message);
  if(!message) {
    res.status(400).json({error:`text' property are required`});
  }
  else {
    message.id = messages.length;
    messages.push(message);
    res.json({message})

    // setTimeout( () => {
    //   res.json({message})
    // }, 5000);
    
  }

});

//post user
app.post('/post-user', express.json(), (req, res) =>  {
  const {user}  = req.body;
  console.log("test new user: " + user.name);
  if(!user) {
    res.status(400).json({error:`text' property are required`});
  }
  else {
     // already exist, or new user, response logged in to be true
    // new user log in, add to users list; 
    users[user.name] = true;
    // console.log(users)
    isLoggedIn = true;
    res.json({user, isLoggedIn})
  }

});

//delete user
app.post('/delete-user', express.json(), (req, res) =>  {
  const {user}  = req.body;
  console.log("delete new user: " + user.name);
  if(!user) {
    res.status(400).json({error:`text' property are required`});
  }
  else {
     // already exist, or new user, response logged in to be true
    // new user log in, add to users list; 
    delete users[user.name]; 
    // console.log(users)
    isLoggedIn = false;
    res.json({users, isLoggedIn})
  }

});

//fetch selected message
app.post('/fetch-message', express.json(), (req, res) =>  {
  let msgId  = req.body.messageId;
  msgId = parseInt(msgId, 10)
  console.log("test msg id: " + msgId);

  if(msgId === null) {
    res.status(400).json({error:`text' property are required`});
  }
  else {
  console.log(msgId)
   const curMessage = messages[msgId]
   console.log(curMessage.text)

   setTimeout( () => {
    res.json({curMessage})
  }, 3000);
    // res.json({curMessage})
  }

});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));