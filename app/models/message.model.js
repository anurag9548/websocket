import mongoose from 'mongoose';



const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  files: { type: String, required: false },
  sender_id: { type: String, required: true },
  receiver_id: { type: String, required: false, default: null},
  seen: { type: Number, required: true, default: 0},
  date: { type: String, required: true},
  status: { type: Number, required: false, default: 0},
}, {
  timestamps: true,
});


const Message = mongoose.model('Message', messageSchema);
export default Message;