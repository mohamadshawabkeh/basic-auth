'use strict';
const { app } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
const mockServerMethods = supertest(app);
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UsersModel } = require('../src/models/index');


beforeAll(async () => {
    await db.sync();
});

describe('testing my server', () => {
    it('return Home', async () => {
        const response = await mockServerMethods.get('/');
        expect(response.status).toBe(200);
    });
    it('return 404 in an invalid routes', async () => {
        const response = await mockServerMethods.get('/no');
        expect(response.status).toBe(404);
    });
    it('return 404 in an invalid method', async () => {
        const response = await mockServerMethods.post('/no');
        expect(response.status).toBe(404);
    });
    it('should create a new user', async () => {
        const username = 'testuser';
        const password = 'testpassword';
    
        const response = await mockServerMethods.post('/signup').send({ username, password });
    
        expect(response.status).toBe(201);
    
        const user = await UsersModel.findOne({ where: { username } });
        expect(user).toBeDefined();
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        expect(passwordMatch).toBe(true);
      });
    it('should return an error if no credentials are provided', async () => {
        const response = await mockServerMethods.get('/signin');
    
        expect(response.status).toBe(500);
        expect(response.text).toBe('no username or password as inserted');
      });
});

afterAll(async () => {
    await db.drop();
});