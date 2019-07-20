const router = require('express').Router();
const Member = require('../models/member');

// 로그인
router.post('/login', (req, res) => {
  Member.findOneByMemberid(req.body.member_id)
    .then((member) => {
      if (!member) return res.json({ result : 0, reason : 'ID not found' }); // ID Check
      if (member.member_pwd != req.body.member_pwd)  // Password Check
       return res.json({ result : 0, reason : 'PWD not correct' });
      else {
          return res.json({result : 1, nickname : member.member_nickname});
      }
    })
    .catch(err => res.status(500).send(err));
});

// 아이디 중복검사
router.post('/checkID', (req, res) => {
  Member.findOneByMemberid(req.body.member_id)
    .then((member) => {
      console.log(member)
      if (!member)
          return res.json({ result : 1 }); // 중복된 아이디 존재 X
      else
          return res.json({ result : 0 }); // 중복된 아이디 존재 O
    })
    .catch(err => res.status(500).send(err));
});

// 닉네임 중복검사
router.post('/checkNickname', (req, res) => {
  Member.findOneByMemberNickname(req.body.member_nickname)
    .then((member) => {
      if (!member)
          return res.json({ result : 1 }); // 중복된 닉네임 존재 X
      else
          return res.json({ result : 0 }); // 중복된 닉네임 존재 O
    })
    .catch(err => res.status(500).send(err));
});

// 회원가입
router.post('/join', (req, res) => {
  Member.create(req.body)
    .then(member => res.json({result : 1}))
    .catch(function(err) {
      console.error(err);
      res.json({result : 0});
    });
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
