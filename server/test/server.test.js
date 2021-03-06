const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed'); 

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

	it('should create a new todo', (done) => {
		var text = 'Test toto text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect( (res) => {
				expect(res.body.text).toBe(text);
			})
			.end( (err, res) => {
				if(err){
					return done(err);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end( (err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});

});

describe('GET /todos', () => {

	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {

	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/${(new ObjectID).toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});

});

describe('DELETE /todos/:id', () => {

	it('should remove a todo', (done) => {
		request(app)
			.delete(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(todos[0]._id.toHexString())
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}
				Todo.findById(todos[0]._id.toHexString()).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.delete(`/todos/${(new ObjectID).toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});

});

describe('PATCH /todos/:id', () => {

	it('should update the todo', (done) => {
		request(app)
			.patch(`/todos/${todos[0]._id.toHexString()}`)
			.send({
				'completed':true, 
				'text':'Other todo test'
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe('Other todo test');
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}
				done()
			});

	});

	it('should clear completedAt when todo is not completedAt', (done) => {
		request(app)
			.patch(`/todos/${todos[1]._id.toHexString()}`)
			.send({
				'completed':false, 
				'text':'Other todo test 2'
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe('Other todo test 2');
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}
				done()
			});
	});

});

describe('GET /users/me', () => {

	it('should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});

});

describe('POST /users', () => {

	it('should create a user', (done) => {
		let email = 'example@example.com';
		let password = '123mnb!';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end(done);
	});

	it('should return validation errors if request invalid', (done) => {
		let email = 'example@example';
		let password = null;

		request(app)
			.post('/users')
			.send({email, password})
			.expect(400)
			.end(done);
	});

	it('should not create user if email in use', (done) => {
		let email = users[0].email;
		let password = 'psw123';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(400)
			.end(done);
	});
});