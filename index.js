import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import db from './database/connection.js'
import reviewRoutes from './routes/review.js'
import donationRoutes from './routes/donation.js'
import deliveryRoutes from './routes/delivery.js'

const app = express()
dotenv.config()
try {
  await db.authenticate()
  console.log('Connection has been established successfully.')
}
catch (error) {
  console.error('Unable to connect to the database:', error)
  // throw new Error('Error en la conexion', error)
}
const corsOptions ={
  origin:'*', 
  credentials:true,       
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Rutas
app.use('/api/auth', authRoutes)
//TODO: auth, crear, login, renew
//TODO: CRUD: Eventos
app.use('/api/review', reviewRoutes)

app.use('/api/donation', donationRoutes)

app.use('/api/delivery', deliveryRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT)
})








