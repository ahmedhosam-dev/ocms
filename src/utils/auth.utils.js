import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// JWT Utility Functions
export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
      algorithm: process.env.JWT_ALGORITHM,
    })
  } catch (error) {
    console.error("Error while generate new token")
    throw new Error("Error while generate new token")
  }
} 

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: [process.env.JWT_ALGORITHM],
    })
  } catch (error) {
    throw new Error('Invalid token')
  }
}

// Forgot password token
export const randomToken = (numberOfBytes, toString) => {
  try {
    return crypto.randomBytes(numberOfBytes).toString(toString)
  } catch (error) {
    console.error("Error while generate random token")
    throw new Error("Error while generate random token")
  }
} 

// Encrpt password
export const encrptPssword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
  password = await bcrypt.hash(password, salt)
  return password
}

// Is Expired
export const isExpired = (expireDate) => {
  return new Date() > new Date(expireDate)
}
