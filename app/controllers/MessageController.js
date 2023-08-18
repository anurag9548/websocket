import Message from '../models/message.model.js';
import  emitNewMessageEvent  from '../events/NewMessage.js';
import User from '../models/user.model.js';


const createMessage = async (req, res) => {
    
    
  // const { text, sid, bid, ask, ltp, high, low, change, type, files, receiver_id } = req.body;
  const text = req.params.text;

  const dataArray = text.split(",");

  if (dataArray[0] == 'Q') {
    let type = dataArray[0];
    let symbol = dataArray[1];
    let ltp = dataArray[2];
    let volume = dataArray[6];
    let bid = dataArray[7];
    let ask = dataArray[9];
    let high = dataArray[12];
    let low = dataArray[13];
    let open = dataArray[11];
    let close = dataArray[14];
   

    // Extract the time from the given timestamp
    
    
    try {
      // Create a new message
      const newMessage = new Message({
        type,
        symbol,
        ltp,
        volume,
        bid,
        ask,
        high,
        low,
        open,
        close,
        date: new Date().toDateString(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
      
      });

     

      const results = await Message.aggregate([
        {
          $match: {
            symbol: symbol,
            date: new Date().toDateString()
          }
        },
        {
          $group: {
            _id: {
              symbol: '$symbol',
              hour: '$hour', // Group by the 'hour' field
              minute: '$minute' // Group by the 'minute' field
  
            },
            
            open: { $first: '$open' },
            high: { $max: '$high' },
            low: { $min: '$low' },
            close: { $last: '$close' },
            volume: { $sum: '$volume' },
            date: { $first: '$createdAt' }
          }
        },
        {
          $sort: { '_id.hour': -1, '_id.minute': -1 } // Sort in descending order
        },
        {
          $limit: 20 // Get only the first document
        }
      ]);

      emitNewMessageEvent(newMessage, results);

      await newMessage.save();
      
      res.status(200).json({ message: 'message successfully sent' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // const results = {};

    // emitNewMessageEvent(text, results);
    res.status(200).json({ message: 'Starting....' });
  }

    
    
};

const getData = async(req, res) => {
  let symbol = req.params.symbol;
  const results = await Message.aggregate([
    {
      $match: {
        symbol: symbol,
        date: new Date().toDateString()
      }
    },
    {
      $group: {
        _id: {
          symbol: '$symbol',
          hour: '$hour', // Group by the 'hour' field
          minute: '$minute' // Group by the 'minute' field

        },
        
        open: { $first: '$open' },
        high: { $max: '$high' },
        low: { $min: '$low' },
        close: { $last: '$close' },
        volume: { $sum: '$volume' },
        date: { $first: '$createdAt' }
      }
    },
    {
      $sort: { '_id.hour': 1, '_id.minute': 1 }
    }
  ]);

  res.status(200).json(results);
}

export {createMessage, getData};