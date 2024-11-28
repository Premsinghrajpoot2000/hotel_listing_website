import axios from 'axios'
import './FirstProjectsDetails.css'
import React, { useEffect, useState } from 'react'


function FirstProjectsDetails() {
    let [firstProjectAllData, setFirstProjectAllData] = useState('')
    useEffect(() => {
        const FirstPorjectData = async () => {
            try {
                let FirstProjectDataGet = await axios.get(`${process.env.REACT_APP_API_URL}/getFirst`)
                setFirstProjectAllData(...FirstProjectDataGet.data)
            } catch (error) {
                console.log(error)
            }
        }
        FirstPorjectData()
    }, [])
    if (!firstProjectAllData) {
        return <div>Loading Please Wait...</div>
    }

    return (
        <div className='projectDetailsMain'>
            <div className='projectDetailUserInfo'>
                <div className='ProjectDetailsUserImage'>
                    <img src={firstProjectAllData.ProfileLogo} alt='user' />
                </div>
                <div className='ProjectDetailsUserName'>
                    <p>{firstProjectAllData.Name}</p>
                    <p>{firstProjectAllData.userName}</p>
                </div>
                <div className='ProjectDetailslike'>
                    <div>{firstProjectAllData.likes}</div>
                    <i className="fa-regular fa-thumbs-up"></i>
                </div>
            </div>
            <div className='ProjectDetailsPageInfo'>
                <h1>{firstProjectAllData.projectTitle}</h1>
                <div className='ProjectDetailsImage'>
                    <img src={firstProjectAllData.ProjectImage} alt='project' />
                </div>
                <p>{firstProjectAllData.projectDiscription}</p>
            </div>
        </div>
    )
}

export default FirstProjectsDetails
