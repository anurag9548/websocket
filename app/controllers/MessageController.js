import Message from '../models/message.model.js';
import  emitNewMessageEvent  from '../events/NewMessage.js';
import User from '../models/user.model.js';

const createMessage = async (req, res) => {
    
    
    const { text, files, receiver_id } = req.body;
    const sender_id = req.user._id;
    const date = new Date();

    try {
      // Create a new message
      const newMessage = new Message({
        text,
        files,
        sender_id,
        receiver_id,
        date
      });
      // Save the user to the database
      await newMessage.save();

     
      const userDetail = await User.findById(req.user._id);
      // Emit the Socket.io event to broadcast the new message to all clients
      try{
        emitNewMessageEvent(newMessage, userDetail);
        res.status(200).json({ message: 'message sent'});
      }catch(e){
        res.status(500).json({ message:error.message });
      }
    
     
  
    } catch (error) {
      res.status(500).json({ message:error.message });
    }
  };
  export {createMessage};