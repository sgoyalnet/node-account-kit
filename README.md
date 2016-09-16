# node-account-kit
Account Kit helps you quickly register for apps using just your phone number or email address — no password needed. It's reliable, easy to use and gives you a choice about how you sign up for apps.

node-account-kit is a nodeJS module to handle account-kit server side implementation.

Full documentation for account kit can be found here [http://l.sgoyal.net/2ct7zQh](https://developers.facebook.com/docs/accountkit/web)

### Version
1.0.0

### DEMO

Click [http://l.sgoyal.net/accountkit](http://l.sgoyal.net/accountkit "account-kit demo implementation") to see running demo.

Demo Code available here [ https://github.com/sgoyalnet/account-kit-app ](https://github.com/sgoyalnet/account-kit-app)

### Features

  - Generate randon non gussable string which can be passed to front end javascript file to be used for csrf.
  - One shot function to authenticate and generate access token and return user information.
  - support require app secret option.
  - User data removal support.
 
### Installation

```sh
npm install node-account-kit
```
### Usages

**Step 1** Include module to your server.js
```javascript
var accountkit = require ('node-account-kit');
```
**Step 2** Configure account kit.
```javascript
accountkit.set ("API_VERSION", "APP_ID", "ACCOUNT_KIT_APP_SECRET");
// all info can be found on developer site at facebook 
accountkit.requireAppSecret (true);// if you have enabled this option
```
[https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)


**Step 4** Use it.
user data can be fetched inside the post request which client have submitted after account kit login.
AngularJs helper library can be seen here [https://github.com/sgoyalnet/ng-account-kit](https://github.com/sgoyalnet/ng-account-kit)
```javascript
//accountKitState and accountKitCode are the response thet we get from account kit login operation. look for sample app for more usage information.
accountkit.getUserData (res, req.body.accountKitState, req.body.accountKitCode, function(resp) {
  res.send (resp);
    /**
    {
        "email": {
            "address": "mail.goyalshubham@gmail.com"
        },
        "id": "941488975973375"
    }
    */
});
// deleting user data
//id is account-kit user id
accountkit.deleteUser(req.query.id, function(resp){
	res.send (resp);
});
```

### Methods

* accountkit.getUserData (response, accountKitState, accountKitCode, callback);
* deleteUser (id, callback);

### Contribute

Do you want to improve it? Sounds cool. Please drop me a line at <mail.goyalshubham@gmail.com>

