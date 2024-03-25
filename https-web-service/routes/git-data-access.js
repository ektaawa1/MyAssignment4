import express from 'express';
import axios from 'axios';
import {GITHUB_ACCESS_TOKEN} from '../settings.js';
import { getLoggerInstance } from '../logger.js';

const access_git_data = express.Router()
const token = GITHUB_ACCESS_TOKEN
const api_url = 'https://api.github.com/repos/CS548-2024Spring/SFBU-info/contents/class-schedule.json'
const logger = getLoggerInstance()


// GET request- To fetch the class-schedule.json from github
// https://localhost:8080/https-web-service/v1/fetch-git-data
access_git_data.get('/fetch-git-data', async (req, res) => {
    logger.info('Fetching the data from github api...')
    const response = await axios.get(api_url,{
            headers: {
              'Accept': 'application/vnd.github.raw+json',
              'Authorization': `Bearer ${token}`
            }
    })

    res.json(response.data)
})

// POST Request- To fetch only the online class schedule as a response
// https://localhost:8080/https-web-service/v1/online-class-schedule
access_git_data.post('/online-class-schedule', async (req, res) => {
    logger.info('Fetching only the online class schedule data...')
    try {
        const {Classroom} = req.body
        if(!Classroom){
            return res.status(400).json({message: "Classroom was not provided by the client in the request"})
        }
        
        const response = await axios.get(api_url,{
            headers: {
              'Accept': 'application/vnd.github.raw+json',
              'Authorization': `Bearer ${token}`
            }
        })
        
        const resp_filtered = response.data.filter(s => s.Classroom === Classroom)
    
        res.json(resp_filtered)
    } catch (message) {
        res.status(500).json({message: "Internal server error"})
    }
})


export default access_git_data