'use strict';

const util = require('util');

const index = {};

index.AuthError = function AuthError(code, message, statusCode) {
   this.name = this.constructor.name;
   this.message = message || 'Unauthorized';
   this.code = code || 4000;
   this.status = statusCode || 403;
   Error.captureStackTrace(this, this.constructor);
};

util.inherits(index.AuthError, Error);

index.GenericError = function GenericError(code, message) {
   this.name = this.constructor.name;
   this.message = message || 'Error';
   this.code = code || 1000;
   Error.captureStackTrace(this, this.constructor);
};

util.inherits(index.GenericError, Error);

module.exports = index;
