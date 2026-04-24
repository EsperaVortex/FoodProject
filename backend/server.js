import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { connectDB } from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url'
import itemRouter from './routes/itemRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import express from 'express'
const app = express();

const PORT = process.env.PORT || 4000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/user', userRoutes)
app.use('/api/items', itemRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})