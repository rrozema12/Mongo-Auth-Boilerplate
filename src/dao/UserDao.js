'use strict';

const MongoUserDao = require('./mongo/MongoUserDao');

const UserDao = (() => {
   return {
      createUser: MongoUserDao.createUser,
      authenticateUserByEmail: MongoUserDao.authenticateUserByEmail,
      findUserByEmail: MongoUserDao.findUserByEmail
   };
})();

module.exports = UserDao;