import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './userModel.js';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hii');
});

app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    console.log(user);
    res.status(201).send({ message: 'user created successfully' });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send(user);
      }
    }
  } catch (err) {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('succesfully connected to database'))
  .catch((err) => console.log(err));

app.listen(process.env.port, () => {
  console.log('server started....!');
});
