import mongoose from 'mongoose';

// const subSchema = new mongoose.Schema({
//   value: { type: Number, required: true },
//   is_up: { type: Boolean, required: true },
// }, { _id: false });

const messageSchema = new mongoose.Schema({
  type: { type: String, required: true },
  symbol: {type: String, required: true},
  ltp: { type: String, required: true },
  volume: { type: String, required: true },
  bid: { type: String, required: true },
  ask: { type: String, required: true },
  high: { type: String, required: true },
  low: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  date: { type: String, required: true},
  hour: { type: String, required: true},
  minute: { type: String, required: true},
 
 
}, {
  timestamps: true,
});


const Message = mongoose.model('Message', messageSchema);
export default Message;