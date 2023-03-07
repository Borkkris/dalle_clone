import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

// this allowes us to pull our environment variables from our dotenv file
dotenv.config();

// initialize the express application by running:
const app = express();
// add additional middleware function:
app.use(cors());
// middleware that accepts an option object
app.use(express.json({ limit: '100mb'}))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

// route
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

// to run the app on a server
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer();