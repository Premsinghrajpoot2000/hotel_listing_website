import { Link } from 'react-router-dom';
import './ContentItems.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ContentItems() {
    const [contentsDatabase, setContentsDatabase] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://hotel-listing-website-server.onrender.com/get`);
            setContentsDatabase(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

    async function likesUpdate(mainId, id, event) {
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

            let likes = contentsDatabase[mainId].likes
            likes += 1
            await axios.patch(`https://hotel-listing-website-server.onrender.com/patchContent/${id}`, { likes });
            event.target.disabled = true;

            fetchData();
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    }

    function formatLikes(likes) {
        if (likes < 1000) {
            return likes
        } else if (likes < 1000000) {
            return (likes / 1000).toFixed(2) + 'K';
        } else if (likes < 1000000000) {
            return (likes / 1000000).toFixed(2) + 'M';
        } else {
            return (likes / 1000000000).toFixed(2) + 'B';
        }
    }

    return (
        <div className='forGrid'>
            {contentsDatabase.map((item, id) => (
                <div className="contentItemsDiv" key={id}>
                    <div className='userInfo'>
                        <div className='userImage'>
                            <img src={item.ProfileLogo} alt='man' />
                        </div>
                        <div className='userName'>
                            <div>{item.Name}</div>
                            <div>{item.userName}</div>
                        </div>
                        <button className='like' onClick={(event) => likesUpdate(id, item._id, event)}>
                            <div className='premsingh1'>{formatLikes(item.likes)}</div>
                            <i className="fa-regular fa-thumbs-up"></i>
                        </button>
                    </div>
                    <div className='Image'>
                        <Link to={`/ProjectsDetailsPage/${id}`}><img src={item.ProjectImage} alt='sec' /></Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContentItems;
