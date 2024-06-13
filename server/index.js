import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import clientRoute from './routes/client.route';
import generalRoute from './routes/general.route';
import managementRoute from './routes/management.route';
import salesRoute from './routes/sales.route';

//configureations

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors)

//routes
app.use('/client', clientRoute)
app.use('/general', generalRoute)
app.use('/management', managementRoute)
app.use('/sales', salesRoute)

//mongoose
const port = process.env.PORT || 9000
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {
        app.listen(port, () => console.log(`Mongodb connected. Sserver running at port ${port}`))
    })
    .catch((error) => console.log(`error connecting to database: ${error}`))