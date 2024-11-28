import { useState, useEffect } from 'react';
import axios from 'axios';
import './FooterItems.css'

function FooterItems() {
    const [getdata1, setGetdata1] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://hotel-listing-website-server.onrender.com/FooterGet`);
            setGetdata1(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {getdata1.map((value, index) => (
                <div key={index}>
                    <div className='footerUserInfo'>
                        <div>
                            <img src={value.Image} alt={`Profile of ${value.Name}`} />
                        </div>
                        <div>
                            <p>{value.Name}</p>
                            <p>Experience - <span className='expYrs'>{value.Exprience}Yrs +</span></p>
                        </div>
                    </div>
                    <div className='aboutEnd'>
                        <div className='hr'></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FooterItems;