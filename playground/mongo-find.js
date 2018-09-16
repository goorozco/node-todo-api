//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unabled to connect to Mongo DB server');
	}
	console.log('Connected to Mongo DB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').find({
	// 	_id:new ObjectID('5b9c4733ec2969caf0248653')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fech todos..', err);
	// });

	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) => {
		console.log('Unable to fech todos..', err);
	});

	console.log('still counting???');
	//client.close();
});
console.log('still counting otside ???');