// controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  
  const { email, device_id, password } = req.body;
 
  try {
    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    
   

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    

    const trimmedPassword = password.trim();
    
    
    // Compare the password
    const isPasswordMatch = await bcrypt.compare(trimmedPassword, user.password);
   

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    user.device_id = device_id;
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    const sanitizedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        avatar: user.avatar,
        
      };

    // Password matched, user is authenticated
    res.status(200).json({ message: 'Login successful.', 'user': sanitizedUser, token: token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const signupUser = async (req, res) => {
    console.log(req.body);
    const { name, email, mobile, device_id, password } = req.body;
  
    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
  
   
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      

      // Create a new user
      const newUser = new User({
        name,
        email,
        mobile,
        device_id,
        password:hashedPassword,
       
      });
  
      // Save the user to the database
      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const sanitizedUser = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        gender: newUser.gender,
        avatar: newUser.avatar,
       
      };
  
      res.status(200).json({ message: 'User registered successfully.', 'user': sanitizedUser, token:token });
  
    } catch (error) {
      res.status(500).json({ message:error.message });
    }
  };

  export {loginUser, signupUser};