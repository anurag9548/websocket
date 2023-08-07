import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  device_id: { type: String, required: true, select: false},
  password: { type: String, required: true, select: false},
  gender: { type: Number, required: false, default: 0}, //0 = male, 1 = female
  avatar: { type:String, required: false },
  default_address: { type: Number, required: false, default:null},
}, {
  timestamps: true,
});



const User = mongoose.model('User', userSchema);
export default User;