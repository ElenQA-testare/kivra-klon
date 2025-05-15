import request from 'supertest';
import mongoose from 'mongoose';
import { Application } from 'express';
const app = require('../server') as Application;

describe('🧪 Auth API', () => {
  const timestamp = Date.now();
  const testEmail = `testuser${timestamp}@example.com`;
  const password = 'test123';

  it('✅ should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: testEmail,
      password,
    });

    // Acceptera både 200 och 201
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('token');
  });

  it('✅ should login and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  // 🔻 Stäng MongoDB-anslutning efter alla tester
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
