//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unabled to connect to Mongo DB server');
	}
	console.log('Connected to Mongo DB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unabled to insert todo', err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	db.collection('Users').insertOne({
		name: 'Gonzalo Orozco',
		age: 36,
		location: 'Villa Carlos Paz, Córdoba'
	}, (err, result) => {
		if(err){
			return console.log('Unabled to insert user', err);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	client.close();
});
