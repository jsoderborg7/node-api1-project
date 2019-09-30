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
  userDB.insert(userData)
    .then(user =>{
      res.json(user);
    })
    .catch(err =>{
      res.send({message: 'error saving user'});
    });
});

server.get('/api/users', (req, res) =>{
  userDB.find()
    .then(user =>{
      res.send(user);
    })
    .catch(err =>{
      res.send(err);
    });
});

server.get('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  userDB.findById(id)
    .then(user =>{
      res.send(user);
    })
    .catch(err =>{
      res.send(err);
    });
});

server.delete('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  userDB.remove(id)
    .then(user =>{
      res.json(user);
    })
    .catch(err =>{
      res.send(err);
    });
});

server.put('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  const changes = req.body;

  userDB.update(id, changes)
    .then(user =>{
      res.json(user);
    })
    .catch(err =>{
      res.send({message: "failed to save changes"});
    });
});

