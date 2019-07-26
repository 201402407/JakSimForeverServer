const router = require('express').Router();
const Room = require('../models/room');

// 타입에 따른 모든 테이터 불러와서 리스트 출력
router.post('/getRoomList', (req, res) => {
  Room.findOneByRoomType(req.body.room_duration)
    .then((room) => {
      return res.json(room);
    //   if (!room)
    //       return res.json(room); // 중복된 닉네임 존재 X
    //   else
    //       return res.json({ result : 0 }); // 중복된 닉네임 존재 O
    })
    .catch(err => res.status(500).send(err));
});

// 방 ID로 방 데이터 찾기
router.post('/getRoomData', (req, res) => {
  Room.findOneByRoomID(req.body._id)
    .then((room) => {
      return res.json(room);
    //   if (!room)
    //       return res.json(room); // 중복된 닉네임 존재 X
    //   else
    //       return res.json({ result : 0 }); // 중복된 닉네임 존재 O
    })
    .catch(err => res.status(500).send(err));
});

// 방 생성
router.post('/addRoom', (req, res) => {
  Room.create(req.body)
    .then(room => res.json({result : room._id}))
    .catch(function(err) {
      console.error(err);
      res.json({result : 0});
    });
});

module.exports = router;
