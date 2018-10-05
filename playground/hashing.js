const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var psw = 'dumy.123';


bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(psw, salt, (err, hash) => {
		console.log(hash);
	});
});


var hashedpsw = '$2a$10$f0eXEYBJNFuvuvFnGSR58eQ8CIQj.L23u/dqTQKxM5vAFuHOg6A7W';
bcrypt.compare(psw, hashedpsw, (err, res) => {
	console.log(res);
});
// var data = {
// 	id: 10
// };


// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded= jwt.verify(token, '123abc');
// console.log(decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// let data = {
// 	id: 4
// };
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecrethash').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecrethash').toString();
// if(resultHash === token.hash){
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }