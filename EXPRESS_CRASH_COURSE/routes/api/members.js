const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


router.get('/api/members/', (req, res) => {
    res.json(members);
   // res.send(valami);
});

/*router.get('/api/members/:id', (req, res) => {
  res.json(members.filter(member => member.id === parseInt(req.params.id)));
});*/
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === +req.params.id));

  }
  else {
    res.status(400).json({ msg: `Nincs ${req.params.id} idéjű elem.`});
  }
});

router.post('/', (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newMember.name || !newMember.email) {
    res.status(400).json({ msg: 'Kérlek tartalmazzon nevet és emailt is.'})
  }

  members.push(newMember);
  res.json(members);
  //res.redirect('/');
});

router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if(member.id == parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        
        res.json({ msg: 'Elem frissítve', member});
      }
    });
  }
  else {
    res.status(400).json({ msg: `Nincs ${req.params.id} idéjű elem.`});
  }
});

router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({ msg: 'Elem törölve', members: members.filter(member => member.id !== +req.params.id)});

  }
  else {
    res.status(400).json({ msg: `Nincs ${req.params.id} idéjű elem.`});
  }
});

module.exports = router;
