const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b9ea764549a58d30728853b';

// if(!ObjectID.isValid(id)){
// 	return console.log('ID not valid');
// }
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('Id not found!');
// 	}
// 	console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
	if(!user){
		return console.log('User Id not Found');
	}
	console.log('User by id', user);
}).catch((e) => console.log(e));

