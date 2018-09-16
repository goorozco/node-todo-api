//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if(err){
		return console.log('Unabled to connect to Mongo DB server');
	}
	console.log('Connected to Mongo DB server');
	const db = client.db('TodoApp');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5b9e95c9762db52fa4cbaebc')
	}, {
		$set:{
			completed: true
		}	
	}, {
		returnOriginal: false
	}).then(result => {
		console.log(result);
	});
});