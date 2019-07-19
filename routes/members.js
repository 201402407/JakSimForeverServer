const router = require('express').Router();
const Member = require('../models/member');

// 로그인
router.post('/login', (req, res) => {
  Member.findOneByMemberid(req.body.member_id)
    .then((member) => {
      if (!member) return res.send({ result: 0, reason: 'ID not found' }); // ID Check
      if (member.member_pwd != req.body.member_pwd)  // Password Check
       return res.send({ result: 0, reason: 'PWD not correct' });
      else {
          res.send({result: 1, nickname: member.member_nickname});
      }
    })
    .catch(err => res.status(500).send(err));
});

// Find All
router.get('/', (req, res) => {
  Member.findAll()
    .then((members) => {
      if (!members.length) return res.status(404).send({ err: 'Member not found' });
      res.send(`find successfully: ${members}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/member_id/:member_id', (req, res) => {
  Member.findOneByMemberid(req.params.member_id)
    .then((member) => {
      if (!member) return res.status(404).send({ err: 'Member not found' });
      res.send(`findOne successfully: ${member}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new member document
router.post('/', (req, res) => {
  Member.create(req.body)
    .then(member => res.json({result : 1}))
    .catch(function(err) {
      console.error(err);
      res.json({result : 0});
    });
});

// Update by member_id
router.put('/member_id/:member_id', (req, res) => {
  Member.updateByMemberid(req.params.member_id, req.body)
    .then(member => res.send(member))
    .catch(err => res.status(500).send(err));
});

// Delete by member_id
router.delete('/member_id/:member_id', (req, res) => {
  Member.deleteByTodoid(req.params.member_id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
