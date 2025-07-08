import { auth } from 'google-auth-library'
import * as authService from '../services/auth.service.js'

export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body)
    res.status(201).json(result)
  } catch (error) {
    console.error('Register Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body)
    res.json(result)
  } catch (error) {
    console.error('Login Error:', error.message)
    res.status(401).json({ error: error.message })
  }
}

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body
    const result = await authService.googleAuth(idToken)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const result = await authService.logout(token)
    res.json(result)
  } catch (error) {
    console.error('Logout Error:', error)
    res.status(400).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const result = await authService.forgotPassword(email)
    res.status(200).json(result)
  }
  catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token
    const { password } = req.body

    const result = await authService.resetPassword(token, password)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const result = await authService.refreshToken(token)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
