'use strict';

const MongoUserDao = require('./mongo/MongoUserDao');

const UserDao = (() => {
   return {
      insertUser: MongoUserDao.insertUser,
      findUserByEmail: MongoUserDao.findUserByEmail
   };
})();

module.exports = UserDao;