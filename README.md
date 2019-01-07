# Mongo Auto Boilerplate
A Node, Mongo, Express and Passport Boilerplate with Bearer Authentication for my personal projects.

## Prereqs

### MongoDB
##### First Time
1. Run `brew update`
2. Run `brew install mongodb`
3. Run `sudo mkdir -p /data/db` then enter your password
4. Run `sudo chown -R 'id -un' /data/db` then enter your password
5. Run `mongod`
6. Open a new terminal window and run `mongo`
7. Run `use (Database name goes here)`

##### Every Other Time
1. Run `mongod`
2. Open a new terminal window and run `mongo`
3. Run `use (Database name goes here)`

### Adding your own `config` folder
Add a new folder under the root directory called `config`.  This folder will have a file called `keys.js`.  This file will contain the following:

```
module.exports = {
  googleClientId: <YOUR_GOOGLE_API_CLIENT_ID>
  googleClientSecret: <YOUR_GOOGLE_API_CLIENT_SECRET>   
  db: {
    local: <YOUR_LOCAL_MONGODB_URI>
    ...
    prod: <YOUR_LOCAL_MONGODB_URI>
  }
  cookieSecret: <ANY_STRING_YOU_WANT>
}
```

### Node
1. Run `npm install`
2. Run `npm start`
