import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.model.js'
import BlacklistedToken from '../models/token.model.js'
import { generateToken, verifyToken, randomToken, isExpired } from '../utils/auth.utils.js'
import { AuthType } from '../Enums/type.enum.js'
import { sendEmail, defaultMessages } from '../utils/mail.utils.js'
import { UserStatus } from '../Enums/status.enum.js'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// Register a new user
export const register = async (userData) => {
  const { name, email, password } = userData

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error('Email already registered')

  // Create new user
  const user = new User({
    name,
    email,
    password,
    authType: AuthType.MANUAL,
  })
  await user.save()

  // Generate token
  const token = generateToken({ _id: user._id, name: user.name, role: user.role })

  return {
    message: 'User registered successfully',
    user: { id: user._id, name: user.name, email: user.email },
    token,
  }
}

// Login an existing user
export const login = async ({ email, password }) => {
  // Get user by email
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid email or password')
  
  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid email or password')
  
  // Generate token
  const token = generateToken({ _id: user._id, name: user.name, role: user.role })
  
  return {
    message: 'Login successful',
    user: { id: user._id, name: user.name, email: user.email },
    token,
  }
}

// Login/Register via Google
export const googleAuth = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()
  const { email, name, picture } = payload

  let user = await User.findOne({ email })

  if (!user) {
    // If user doesn't exist, create new
    user = new User({
      name,
      email,
      password: '',
      avatar: picture,
      authType: AuthType.GOOGLE,
    })
    await user.save()
  }

  const token = generateToken({ _id: user._id, name: user.name, role: user.role })

  return {
    message: 'Login successful',
    user: { id: user._id, name: user.name, email: user.email },
    token,
  }
}

// Logout
export const logout = async (token) => {
  try {
    // Verify token
    const decoded = verifyToken(token)
    
    // Add token to blacklist
    await BlacklistedToken.create({ 
      token, 
      expiresAt: new Date(decoded.exp * 1000) 
    })

    return { message: 'Logout successful' }
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('Invalid token')
  }
}

// Frogot password
export const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email })

    if (!user) throw new Error("User not found")

    const token = randomToken(20, 'hex')
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000 // 1H

    await user.save()

    await sendEmail(
      user.email,
      defaultMessages.passwordReset.subject,
      defaultMessages.passwordReset.text(token),
    )

    return { message: 'Password reset email sent'} 
  }
  catch (error) {
    throw new Error(error.message)
  }
}

// Reset password
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ resetPasswordToken: token })

  if (!user) throw new Error("Reset password token not exists.")

  if (isExpired(user.resetPasswordExpires)) throw new Error("Password reset token has expired.")  

  try {
    user.password = newPassword
    user.resetPasswordToken = null
    user.resetPasswordExpires = null
    await user.save()
  } catch (error) {
    throw new Error("Error while update password")
  }

  return { message: "Password updated successfully." }
}

// Refresh token
export const refreshToken = async (oldToken) => {
  try {
    // Validate token
    const decoded = verifyToken(oldToken)

    // Not blacklisted
    const blacklisted = await BlacklistedToken.findOne({ oldToken })
    if (blacklisted) throw new Error("Invalid token")

    // User active
    const user = await User.findById(decoded._id)
    if (user.status !== UserStatus.ACTIVE) throw new Error("User account not activated")

    // Add old token to blacklist
    await BlacklistedToken.create({ 
      token: oldToken, 
      expiresAt: new Date(decoded.exp * 1000) 
    })

    // Generate new token
    const token = generateToken({ _id: user._id, name: user.name, role: user.role })

    return { token }

  } catch (error) {
    throw new Error(error.message)
  }
}

