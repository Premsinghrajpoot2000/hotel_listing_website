import { useEffect, useRef, useState } from 'react';
import './ViewAll.css'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function ViewAll() {
    const [contentsDatabase, setContentsDatabase] = useState([]);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search');

    const fetchData = async () => {
        try {
            const response = query ?
                await axios.get(`${process.env.REACT_APP_API_URL}/view_alll?search=${query}`) :
                await axios.get(`${process.env.REACT_APP_API_URL}/get`);

            setContentsDatabase(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, []);

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
            await axios.patch(`${process.env.REACT_APP_API_URL}/patchContent/${id}`, { likes });
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

    let [currentPage, setCurrentPage] = useState(1)
    let [numberIncrement, setNumberIncrement] = useState(1)
    let [start, setStart] = useState(0)
    let [end, setEnd] = useState(0)
    let [pages, setPages] = useState()

    function logic() {
        let itemsPerPage = 12;
        let endf = itemsPerPage * currentPage
        setEnd(endf)
        let startf = endf - itemsPerPage;
        setStart(startf)

        let endPages = contentsDatabase.length / itemsPerPage
        let pagesf = Math.ceil(endPages)
        setPages(pagesf)
    }

    let left_Btn = useRef(null)
    let right_Btn = useRef(null)

    function pagination_Left_btn_handle() {
        if (left_Btn.current.className === 'pagination_Div_Btn' || right_Btn.current.className === 'pagination_Div_Btn') {
            left_Btn.current.classList.add('paginationDiv_disabled')
        } else {
            left_Btn.current.classList.remove('paginationDiv_disabled')
        }
    }

    function pagination_Right_btn_handle() {
        if (currentPage === pages) {
            right_Btn.current.classList.add('paginationDiv_disabled')
        } else {
            right_Btn.current.classList.remove('paginationDiv_disabled')
        }
    }

    useEffect(() => {
        logic()
    })
    useEffect(() => {
        pagination_Left_btn_handle()
    }, [])

    if (pages === 1) {
        pagination_Right_btn_handle()
    }

    function left() {
        let right_Btn = document.getElementById('right_btn')
        if (currentPage !== 1 && numberIncrement !== 1) {
            currentPage--
            setCurrentPage(currentPage)
            numberIncrement--
            setNumberIncrement(numberIncrement)
            logic()
            if (currentPage === 1) {
                pagination_Left_btn_handle()
            }
            right_Btn.classList.remove('paginationDiv_disabled')
        }
    }

    function right() {
        let left_Btn = document.getElementById('left_btn')
        if (currentPage !== pages && numberIncrement !== pages) {
            currentPage++
            setCurrentPage(currentPage)
            numberIncrement++
            setNumberIncrement(numberIncrement)
            logic()
            left_Btn.classList.remove('paginationDiv_disabled')
            pagination_Right_btn_handle()
        }
    }

    let filteredData = contentsDatabase.slice(start, end)

    let Pagination_Left_Btn_Mouse_Down = (event) => {
        if ((currentPage !== 1 && numberIncrement !== 1)) {
            event.target.classList.add('paginationDivMouseDown')
        }
    }
    let Pagination_Right_Btn_Mouse_Down = (event) => {
        if ((currentPage !== 1 && numberIncrement !== 1) || (currentPage !== pages && numberIncrement !== pages)) {
            event.target.classList.add('paginationDivMouseDown')
        }
    }
    let Pagination_Left_Btn_Mouse_Up = (event) => {
        if ((currentPage !== 1 && numberIncrement !== 1) || (currentPage !== pages && numberIncrement !== pages)) {
            event.target.classList.remove('paginationDivMouseDown')
        }
    }
    let Pagination_Right_Btn_Mouse_Up = (event) => {
        if ((currentPage !== 1 && numberIncrement !== 1) || (currentPage !== pages && numberIncrement !== pages)) {
            event.target.classList.remove('paginationDivMouseDown')
        }
    }

    if (!contentsDatabase) {
        return <div>Loading Please Wait...</div>
    }
    return (
        <div>
            <div className='AllforGrid'>
                {filteredData.map((item, id) => (
                    <div className="AllContentItemsDiv" key={id}>
                        <div className='AllUserInfo'>
                            <div className='AllUserImage'>
                                <img src={item.ProfileLogo} alt='man' />
                            </div>
                            <div className='AllUserName'>
                                <div>{item.Name}</div>
                                <div>{item.userName}</div>
                            </div>
                            <button className='AllLike' onClick={(event) => likesUpdate(id, item._id, event)}>
                                <div className='Premsingh1'>{formatLikes(item.likes)}</div>
                                <i className="fa-regular fa-thumbs-up"></i>
                            </button>
                        </div>
                        <div className='AllImage'>
                            <Link to={`/ProjectsDetailsPage/${id}`}><img src={item.ProjectImage} alt='sec' /></Link>
                        </div>
                    </div>
                ))}
            </div>
            <div id='paginationMainDiv'>
                <div id='paginationDiv'>
                    <button id='left_btn' ref={left_Btn} className='pagination_Div_Btn' onMouseDown={Pagination_Left_Btn_Mouse_Down} onMouseUp={Pagination_Left_Btn_Mouse_Up} onClick={left}>&#60;</button>
                    <span>{numberIncrement} of {pages}</span>
                    <button id='right_btn' ref={right_Btn} className='pagination_Div_Btn' onMouseDown={Pagination_Right_Btn_Mouse_Down} onMouseUp={Pagination_Right_Btn_Mouse_Up} onClick={right}>&#62;</button>
                </div>
            </div>
        </div>
    )
}

export default ViewAll