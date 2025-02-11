const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    unique: true
  },
  google_id: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minlength: 6
  }
}, {timestamps : true});


// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
// export default User;