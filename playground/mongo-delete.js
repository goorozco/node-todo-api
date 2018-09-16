//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unabled to connect to Mongo DB server');
	}
	console.log('Connected to Mongo DB server');
	const db = client.db('TodoApp');

	//deleteMany
	db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
		console.log(result);
	});

	//deleteOne
	db.collection('Todos').deleteOne({text: 'Hola'}).then((result) => {
		console.log(result);
	});

	//findOneAndDelete
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result);
	});

	console.log('still counting???');
	//client.close();
});
console.log('still counting otside ???');