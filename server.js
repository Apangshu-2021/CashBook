import express from 'express'
import connectDB from './dbConnect.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import cors from 'cors'
dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
