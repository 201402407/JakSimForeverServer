// Schema는 document의 구조가 어떻게 생겼는지 알려주는 역할.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Define
var memberSchema = new Schema({
    member_id: { type : String, required : true, unique : true },
    member_pwd: { type : String, required : true },
    member_nickname: { type: String, default: "noname" },
    bank_name: { type: String },
    card_num: { type: String },
    card_cvc: { type: Number },
    card_duedate: { type: Date },
    card_pwd: { type: Number }
});

// 회원가입
memberSchema.statics.create = function (payload) {
  // this === Model
  const member = new this(payload);
  // return Promise
  return member.save();
};

// Find All
memberSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by member_id -> 아이디 중복체크, 로그인
memberSchema.statics.findOneByMemberid = function (member_id) {
  return this.findOne({ member_id });
};

// Find One by member_nickname -> 닉네임 중복체크
memberSchema.statics.findOneByMemberNickname = function (member_nickname) {
  return this.findOne({ member_nickname });
};


// Update by todoid
memberSchema.statics.updateByMemberid = function (member_id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ member_id }, payload, { new: true });
};

// Delete by todoid
memberSchema.statics.deleteByMemberid = function (member_id) {
  return this.remove({ member_id });
};

// MODEL 생성. 모델은 보통 대문자부터 시작.
module.exports = mongoose.model('Member', memberSchema);
