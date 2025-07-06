const express = require('express');
const path = require('path');
const { User } = require('./models/user.model');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/dist')));

mongoose.connect(process.env.MONGO_URI);

// API endpoints

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Server Error: ', error);
    res.status(500).json({success: false, message: 'Failed to fetch users'});
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    const username = user.username;
    if(!user) return res.status(404).json({success:false, message: 'User not found'});

    await User.deleteOne({_id: id});
    return res.json({success: true, message: `${username} deleted successfully.`});
  } catch(error) {
    return res.status(500).json({success: false, message: `Server error: ${error}`});
  }
})

app.get('/api/populate', async (req, res) => {
  const response = await fetch('https://dummyjson.com/users');
  const data = await response.json();

  const users = data.users;

  for(let i=0; i<users.length; i++) {
    const user = new User({
      name: `${users[i].firstName} ${users[i].lastName}`,
      username: users[i].username,
      email: users[i].email,
      role: users[i].role
    });

    await user.save();
  }

  res.send('Database populated successfully');
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
})