const Task = require('../models/Task')

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const task = new Task({ title, description, userId: req.user.id })
    await task.save()
    res.status(201).json(task)
  } catch {
    res.status(400).json({ error: 'Invalid data' })
  }
}

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id })
  res.json(tasks)
}

exports.getTaskById = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id })
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
}

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  )
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
}

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json({ message: 'Task deleted' })
}
