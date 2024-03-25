import express from 'express';
import axios from 'axios';

const startup = express.Router()

//get request
//https://localhost:8080/https-web-service/v1
startup.get('/',(req, res) => {
    res.send(`It's Working!!`)
})

// https://localhost:8080/https-web-service/v1/alive
startup.get('/alive',(req,res) => {
    res.send('HTTPS-WEB-SERVICE is Alive')
})

// https://localhost:8080/https-web-service/v1/fetch-data-json
startup.get('/fetch-data-json', async (req, res) => {
    const response = await axios.get('https://api.github.com/repos/ektaawa1/sample-data/contents/github_settings.json')
    const content = response.data.content
    const decodedContent = Buffer.from(content, 'base64').toString('utf-8')

    //Parse JSON content
    const jsonData = JSON.parse(decodedContent)

    res.json(jsonData)
})


export default startup