const db = require('../config/db');

// Register a user using a Knex transaction across both users and hashpwd tables
const createUserTransaction = async (userData, hashedPassword) => {
  return await db.transaction(async (trx) => {
    const [newUser] = await trx('users')
      .insert({
        email: userData.email,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
      })
      .returning('*');

    await trx('hashpwd').insert({
      username: userData.username,
      password: hashedPassword,
    });

    return newUser;
  });
};

// Fetch hashed password by username for login verification
const getHashedPasswordByUsername = (username) => {
  return db('hashpwd').where({ username }).first();
};

const getAllUsers = () => {
  return db('users').select('id', 'email', 'username', 'first_name', 'last_name');
};

const getUserById = (id) => {
  return db('users')
    .where({ id })
    .select('id', 'email', 'username', 'first_name', 'last_name')
    .first();
};

const updateUser = (id, updateData) => {
  return db('users')
    .where({ id })
    .update({
      email: updateData.email,
      first_name: updateData.first_name,
      last_name: updateData.last_name,
    })
    .returning(['id', 'email', 'username', 'first_name', 'last_name']);
};

module.exports = {
  createUserTransaction,
  getHashedPasswordByUsername,
  getAllUsers,
  getUserById,
  updateUser,
};