const { getUsers, addUsers , deleteUser} = require('./reposytory');

const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', async (req, res) => {
    let users = await getUsers();

    if(!!req.query.search){
      users = users.filter(u=> u.name.indexOf(req.query.search)> -1)
    }

    res.send(users);
});
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  let users = await getUsers();
  let user = users.find(u=> u.id == userId)
  if(user){
    res.send(user);
  }else{
    res.send(404);
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  let users = await deleteUser(id);
  res.send(204);  
});

router.post('/', async (req, res) => {
  let name = req.body.name;
    let result = await addUsers(name);
    res.send({ succses: true });
});

module.exports = router;