'use strict';

const MongoGoogleUserDao = require('./mongo/MongoGoogleUserDao');

const UserDao = (() => {
   return {
      insertGoogleUser: MongoGoogleUserDao.insertGoogleUser,
      findGoogleUserById: MongoGoogleUserDao.findGoogleUserById,
      findGoogleUserByUserId: MongoGoogleUserDao.findGoogleUserByUserId
   };
})();

module.exports = UserDao;