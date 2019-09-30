// implement your API here

const express = require('express');

const userDB = require('./data/db');

const server = express();

const port = 8000;
server.listen(port, () => console.log(`\n**API on port ${port} **\n`));

server.use(express.json());

server.post('/api/users', (req, res) =>{
  const userData = req.body;
  console.log('user data', userData);

  if (!userData.name || !userData.bio){
    res.status(400).json({message: 'Please provide a name and bio for the user.'});
  } else {
    userDB.insert(userData)
    .then(user =>{
      res.status(201).json(user);
    })
    .catch(err =>{
      res.status(500).json({message: 'error saving user'});
    });
  }
});

server.get('/api/users', (req, res) =>{
  userDB.find()
    .then(user =>{
      res.send(user);
    })
    .catch(err =>{
      res.status(500).json({message: "The users information could not be retrieved."});
    });
});

server.get('/api/users/:id', (req, res) =>{
  const id = req.params.id;

  if (!id){
    res.status(404).json({message: "The user with that ID does not exist"});
  } else {
    userDB.findById(id)
    .then(user =>{
      res.send(user);
    })
    .catch(err =>{
      res.status(500).json({error: "The user information could not be retrieved."});
    });
  }

});

server.delete('/api/users/:id', (req, res) =>{
  const id = req.params.id;

  if (!id){
    res.status(404).json({message: "The user with that ID does not exist."});
  } else {
    userDB.remove(id)
    .then(user =>{
      res.json(user);
    })
    .catch(err =>{
      res.status(500).json({error: "The user could not be removed"});
    });
  }
});

server.put('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  const changes = req.body;

  if (!id){
    res.status(404).json({message: "The user with that ID does not exist."});
  } else {
    userDB.update(id, changes)
    .then(user =>{
      res.status(200).json({message: "User updated successfully!"});
    })
    .catch(err =>{
      res.status(500).json({error: "The user information could not be modified"});
    });
  }


});

