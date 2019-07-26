// Schema는 document의 구조가 어떻게 생겼는지 알려주는 역할.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Define
var roomSchema = new Schema({
    room_name: { type : String, required : true },
    room_manager_name: { type : String, required : true },
    room_description: { type : String, required : true },
    room_duration: { type : Number, required : true },
    room_money: { type : Number, required : true },
    room_maxpeople: { type : Number, required : true }
});

// Find One by room_type -> 타입에 따라 저장된 모든 리스트 불러오기
roomSchema.statics.findOneByRoomType = function (room_duration) {
  return this.find({ room_duration });
};

// 방의 특정 ID값으로 방 정보 얻기
roomSchema.statics.findOneByRoomID = function (_id) {
  return this.findOne({ _id });
};

// 방생성(임시)
roomSchema.statics.create = function (payload) {
  // this === Model
  const room = new this(payload);
  // return Promise
  return room.save();
};

// MODEL 생성. 모델은 보통 대문자부터 시작.
module.exports = mongoose.model('Room', roomSchema);
