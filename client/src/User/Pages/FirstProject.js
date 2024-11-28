import { useEffect, useState } from 'react'
import './FirstProject.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function FirstProject() {
    let [getdata, setGetdata] = useState(null)

    const Database = async () => {
        try {
            let FirstDataGet = await axios.get(`${process.env.REACT_APP_API_URL}/getFirst`)
            setGetdata(...FirstDataGet.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        Database()
    }, [])

    if (!getdata) {
        return <div>Loading Please Wait...</div>
    }

    async function firstLikesUpdate(id, event) {
        try {
            if (event.target.classList.contains('fa-regular') && event.target.classList.contains('fa-thumbs-up')) {
                event.target.parentElement.disabled = true;
                event.target.parentElement.classList.add('disabled')
            } else if (event.target.classList.contains('premsingh1')) {
                event.target.parentElement.disabled = true;
                event.target.parentElement.classList.add('disabled')
            } else {
                event.target.disabled = true;
                event.target.parentElement.classList.add('disabled')
            }

            let likes = getdata.likes
            likes += 1
            await axios.patch(`${process.env.REACT_APP_API_URL}/patch1/${id}`, { likes });
            event.target.disabled = true;

            Database()
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    }

    function formatLikes(likes) {
        if (likes < 1000) {
            return likes;
        } else if (likes < 1000000) {
            return (likes / 1000).toFixed(2) + 'K';
        } else if (likes < 1000000000) {
            return (likes / 1000000).toFixed(2) + 'M';
        } else {
            return (likes / 1000000000).toFixed(2) + 'B';
        }
    }

    return (
        <div className="Hero">
            <Link to={`/FirstProjectsDetails`}>
                <img src={getdata.ProjectImage} alt='first' />
            </Link>
            <div className='userHero'>
                <div className='userInfoHero'>
                    <Link to={`/FirstProjectsDetails`}>
                        <div className='userImageHero'>
                            <img src={getdata.ProfileLogo} alt='man' />
                        </div>
                        <div className='userNameHero'>
                            <p>{getdata.Name}</p>
                            <p>{getdata.userName}</p>
                        </div>
                    </Link>
                    <button className='like1' onClick={(event) => firstLikesUpdate(getdata._id, event)}>
                        <div className='premsingh1'>{formatLikes(getdata.likes)}</div>
                        <i className="fa-regular fa-thumbs-up"></i>
                    </button>
                </div>
                <Link to={`/FirstProjectsDetails`}>
                    <div className='projectShort'>
                        <div>
                            {getdata.projectTitle}
                        </div>
                        <div>{getdata.projectDiscription}</div>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default FirstProject
