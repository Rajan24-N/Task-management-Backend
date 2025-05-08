const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/User')
const Task = require('../models/Task')

let token
let taskId

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  await User.deleteMany({})
  await Task.deleteMany({})

  // Register
  await request(app)
    .post('/api/register')
    .send({ username: 'testuser', password: 'testpass' })

  // Login
  const res = await request(app)
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpass' })

  token = res.body.token
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Authentication', () => {
  it('should not allow login with wrong password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'wrongpass' })

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('Invalid credentials')
  })
})

describe('Task CRUD', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Task description' })

    expect(res.statusCode).toBe(201)
    expect(res.body.title).toBe('Test Task')
    taskId = res.body._id
  })

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should get task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBe(taskId)
  })

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' })

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('completed')
  })

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('Task deleted')
  })
})
