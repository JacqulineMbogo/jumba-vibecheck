const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'vibecheck' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('User Controller', () => {
  it('should signup a new user', async () => {
    const res = await request(app).post('/api/users/signup').send({
      username: 'TestUser',
      email: 'test@example.com',
      password: 'testpass123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not allow duplicate signup', async () => {
    await request(app).post('/api/users/signup').send({
      username: 'TestUser',
      email: 'test@example.com',
      password: 'testpass123',
    });

    const res = await request(app).post('/api/users/signup').send({
      username: 'TestUser',
      email: 'test@example.com',
      password: 'testpass123',
    });

    expect(res.statusCode).toBe(422);
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/users/signup').send({
      username: 'TestUser',
      email: 'test@example.com',
      password: 'testpass123',
    });

    const res = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'testpass123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
