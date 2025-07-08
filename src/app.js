// Utils 
import express from 'express'
import connectDB from './config/db.js'

// Routes
import authRoutes from './routes/auth.routes.js'
import permissionRoutes from './routes/permission.routes.js'
import imageRoutes from './routes/image.routes.js'
import contentRoutes from './routes/content.routes.js'
import userRoutes from './routes/user.routes.js'
import roleRoutes from './routes/role.routes.js'
import categoryRoutes from './routes/category.routes.js'

// Middleware
import limiter from './middlewares/limiter.middleware.js'

// Doc&Seeders
import setupSwaggerDocs from './config/swagger.js'
import seedDatabase from './seeders/main.seeder.js'

// Database connection
connectDB()

// Init express app
const app = express()

// Seeders
seedDatabase()

// Middleware (General)
app.use(express.json())
app.use(limiter())

// Routes
const prefix = "/api"
setupSwaggerDocs(`${prefix}/docs`, app) // API Documentation 
app.use(`${prefix}/auth`, authRoutes)
app.use(`${prefix}/permission`, permissionRoutes)
app.use(`${prefix}/role`, roleRoutes)
app.use(`${prefix}/category`, categoryRoutes)
app.use(`${prefix}/images`, imageRoutes)
app.use(`${prefix}/user/`, userRoutes)
app.use(`${prefix}/content`, contentRoutes)

export default app
