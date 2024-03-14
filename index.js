import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'


const app = express()
dotenv.config()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

//Rutas
app.use('/api/auth', authRoutes)
//TODO: auth, crear, login, renew
//TODO: CRUD: Eventos

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000')
})