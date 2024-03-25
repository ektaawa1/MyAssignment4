import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const ClassHeader = () => {

    const [classScheduleData, setClassScheduleData] = useState(null)
    const [classScheduleError, setClassScheduleError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fetchClassScheduleAPI = async() => {

        try{
            setIsLoading(true)
            // GET request
            //const response = await axios.get('https://localhost:8080/https-web-service/v1/fetch-git-data')
            
            //POST request
            const response = await axios.post('https://localhost:8080/https-web-service/v1/online-class-schedule', {Classroom: 'Online'})
            setClassScheduleData(response?.data)
        }
        catch{
            setClassScheduleError(true)
        }
        finally{
            setIsLoading(false)
        }
        
    }

    useEffect( () => {
        console.log("Hello from useEffect Hooks")

        fetchClassScheduleAPI()
    }, [])


    console.log(classScheduleData, "This is the class schedule data")

    if(isLoading){
        return <div>Loading...</div>
    }

    if(classScheduleError){
        return <div>Error occurred...</div>
    }

    return(
        <>Class Header

        <span>
            Class Schedule is: {classScheduleData?.classroom}
        </span>

        <button onClick={fetchClassScheduleAPI}>Check</button> 
        </>
    )
}
