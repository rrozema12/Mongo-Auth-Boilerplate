'use strict';

const MongoUserDao = require('./mongo/MongoUserDao');

const UserDao = (() => {
   return {
      createUser: MongoUserDao.createUser,
      findUserByGoogleId: MongoUserDao.findUserByGoogleId,
      findUserById: MongoUserDao.findUserById
   };
})();

module.exports = UserDao;