const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/user');
const Journal = require('../models/journal');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
  });
  await user.save();
  userId = user._id.toString();
  token = jwt.sign({ userId, email: user.email }, 'your_jwt_secret_here');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Journal Controller', () => {
  it('should create a new journal', async () => {
    const res = await request(app)
      .post('/api/journals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Title',
        description: 'Test description',
        user_id: userId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.journal.title).toBe('Test Title');
  });

  it('should return user journals', async () => {
    const res = await request(app)
      .get(`/api/journals/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.journals)).toBe(true);
    expect(res.body.journals[0]).toHaveProperty('title');
  });

  it('should update a journal', async () => {
    const journal = await Journal.findOne({ user_id: userId });

    const res = await request(app)
      .patch(`/api/journals/${journal._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title', description: 'Updated Description' });

    expect(res.statusCode).toBe(200);
    expect(res.body.journal.title).toBe('Updated Title');
  });

  it('should delete a journal', async () => {
    const journal = await Journal.findOne({ user_id: userId });

    const res = await request(app)
      .delete(`/api/journals/${journal._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Deleted journal.');
  });
});
