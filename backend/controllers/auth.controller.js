import User from '../models/User.js'
import { generateToken } from '../utils/tokenUtils.js'

// Register new user
export async function register(req, res) {
    try {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Create user (password will be hashed in model)
        const user = await User.create({
            name,
            email,
            password,
        })

        res.status(201).json({
            message: 'User registered successfully',
            token: generateToken(user),
        })
    } catch (error) {
         console.error('REGISTER ERROR:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Login user
export async function login(req, res) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        res.json({
            message: 'Login successful',
            token: generateToken(user),
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

export async function getMe(req, res) {
    res.json(req.user)
}
