const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ error: 'Username taken' })

    const user = new User({ username, password })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
}
