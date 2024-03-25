import cors from 'cors';
import express from 'express';
import https from 'https';
import fs from 'fs';
import 'dotenv/config'
import startup from './routes/startup.js';
import access_git_data from './routes/git-data-access.js';
import { getLoggerInstance } from './logger.js';


const logger = getLoggerInstance()

const app = express()

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    passphrase: '1234'
}

const server = https.createServer(httpsOptions,app)
app.use(cors()) //now our api can be used in any port
app.use(express.json())
app.use('/https-web-service/v1', startup)
app.use('/https-web-service/v1', access_git_data)


server.listen(8080, () => {
    logger.info('Server is up')
})
