import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import cors from 'cors'
const app = express()
dotenv.config()
// app.use(cors())
app.use(cors({
  origin: 'https://sistdonacion-production.up.railway.app', // Permitir solicitudes solo desde este origen
  methods: ['GET', 'POST'], // Permitir solo ciertos métodos HTTP// Permitir solo ciertos encabezados
}));
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Rutas
app.use('/api/auth', authRoutes)
//TODO: auth, crear, login, renew
//TODO: CRUD: Eventos


app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT)
})