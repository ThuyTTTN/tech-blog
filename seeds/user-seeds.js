const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'luna1',
    password: 'password123'
  },
  {
    username: 'lunatuna',
    password: 'password123'
  },
  {
    username: 'shmoona',
    password: 'password123'
  },
  {
    username: 'loonytunez',
    password: 'password123'
  },
  {
    username: 'lunamuna',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
