import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AddProjects.css'
import axios from 'axios';

function AddProjects() {
    const [editProfileName, setEditProfileName] = useState('');
    const [editProfileUsername, setEditProfileUsername] = useState('');
    const [EditProjectImage, setEditProjectImage] = useState(null);
    const [EditProjectLogo1, setEditProfileLogo1] = useState(null);
    const [editProjectLIkes, setEditProjectLIkes] = useState('');
    const [editProjectTitle, setEditProjectTitle] = useState('');
    const [editProjectDiscription, setEditProjectDiscription] = useState('');
    const [getdata1, setGetdata1] = useState([])

    let PostDataBase = async (AllData) => {
        try {
            await axios.post(`https://hotel-listing-website-server.onrender.com/post`, AllData)
            await Database()
            Loading.current.className = 'AddProjectLoadingDiv'

        } catch (error) {
            console.log(error)
        }
    }
    let Loading = useRef()

    useEffect(() => {
        const Database = async () => {
            try {
                Loading.current.className = 'AddProjectLoading'
                let FirstDataGet = await axios.get(`https://hotel-listing-website-server.onrender.com/getAdded`)
                setGetdata1(FirstDataGet.data)
                Loading.current.className = 'AddProjectLoadingDiv'
            } catch (error) {
                console.log(error)
            }
        }
        Database()
    }, [])

    const Database = async () => {
        try {
            let FirstDataGet = await axios.get(`https://hotel-listing-website-server.onrender.com/getAdded`)
            setGetdata1(FirstDataGet.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        Database()
    }, [])

    let addProjectDeleted = async (ObjId, index) => {
        let ProjectImageLInk = getdata1[index].ProjectImage
        let ProjectImageArray = ProjectImageLInk.split('/')
        let ProjectImage = ProjectImageArray[ProjectImageArray.length - 1].split('.')[0]

        let ProfileLogoLink = getdata1[index].ProfileLogo
        let ProfileLogoArray = ProfileLogoLink.split('/')
        let ProfileLogo = ProfileLogoArray[ProfileLogoArray.length - 1].split('.')[0]

        try {
            await axios.delete(`https://hotel-listing-website-server.onrender.com/deleteAddedData/${ObjId}?ProjectImage=${ProjectImage}&ProfileLogo=${ProfileLogo}`)
            await Database()
            Loading.current.className = 'AddProjectLoadingDiv'

        } catch (error) {
            console.log(error)
        }
    }

    function adminButtonClicked(event) {
        event.target.classList.add('adminButtonClicked')
    }

    function adminButtonUp(event) {
        event.target.classList.remove('adminButtonClicked')
    }

    function editProfiletNameF(event) {
        setEditProfileName(event.target.value)
    }

    function editProfileUsernameF(event) {
        setEditProfileUsername(event.target.value)
    }

    function editProfileLogo1F(event) {
        setEditProfileLogo1(event.target.files[0])
    }

    function editProjectImage1F(event) {
        setEditProjectImage(event.target.files[0])
    }

    function editProjectLIkesF(event) {
        setEditProjectLIkes(event.target.value)
    }

    function editProjectTitleF(event) {
        setEditProjectTitle(event.target.value)
    }

    function editProjectDiscriptionF(event) {
        setEditProjectDiscription(event.target.value)
    }

    function AddProjectsSubmited(event) {
        event.preventDefault();

        if (editProfileName === '') {
            alert('Please Enter Prifile Name')
        } else if (editProfileUsername === '') {
            alert('Please Enter Prifile User Name')

        } else if (EditProjectLogo1 == null) {
            alert('Please Select Profile Logo')
        } else if (EditProjectImage == null) {
            alert('Please Select Project Image')
        } else if (editProjectTitle === '') {
            alert('Please Enter Project Title')
        } else if (editProjectDiscription === '') {
            alert('Please Enter Project Discription')
        } else {
            const formData = new FormData();
            formData.append('ProjectImage', EditProjectImage);
            formData.append('ProfileLogo', EditProjectLogo1);
            formData.append('Name', editProfileName);
            formData.append('userName', editProfileUsername);
            formData.append('likes', editProjectLIkes);
            formData.append('projectTitle', editProjectTitle);
            formData.append('projectDiscription', editProjectDiscription);
            PostDataBase(formData);

            setEditProfileName('')
            setEditProfileUsername('')
            document.getElementById('editProfileLogoInput').value = null;
            document.getElementById('editProjectImageInput').value = null;
            setEditProjectLIkes('')
            setEditProjectTitle('')
            setEditProjectDiscription('')
            Loading.current.className = 'AddProjectLoading'
        }
    };

    return (
        <div className='AddProjectRelative'>
            <div className='AddProjectLoadingDiv' ref={Loading}>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
            </div>
            <div className='addProjectsDiv'>
                <form>
                    <legend className='AddProjectLegend'>Admin Form (Projects Information)</legend>
                    <table>
                        <tbody>
                            <tr className='AddProjectEnterName'>
                                <td>
                                    <p></p>
                                    <label>Enter Profile Name - </label>
                                </td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input id='projectName' type='text' value={editProfileName} onChange={editProfiletNameF} />
                                </td>
                            </tr>
                            <tr className='AddProjectEnterUserName'>
                                <td>
                                    <p></p>
                                    <label>Enter Profile Username - </label>
                                </td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input type='text' value={editProfileUsername} onChange={editProfileUsernameF} />
                                </td>
                            </tr>
                            <tr className='AddProjectEnterLikes'>
                                <td>
                                    <p></p>
                                    <label>Enter Project Likes - </label>
                                </td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'green' }}>Optional</p>
                                    <input type='number' value={editProjectLIkes} onChange={editProjectLIkesF} />
                                </td>
                            </tr>
                            <tr className='AddProjectUpload'>
                                <td><label>Upload Profile Logo - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input id='editProfileLogoInput' type='file' accept="image/*" onChange={editProfileLogo1F} />
                                </td>
                            </tr>
                            <tr className='AddProjectUpload'>
                                <td><label>Upload Project Image - </label></td>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <input id='editProjectImageInput' type='file' accept="image/*" onChange={editProjectImage1F} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className='AddProjectsDetailDiv'>
                <form>
                    <table>
                        <tbody>
                            <tr className='AddProjectEnterTitle'>
                                <td><label>Enter Project Title</label></td>
                            </tr>
                            <tr className='AddProjectDetailsTR'>
                                <td>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <textarea className='AddProjectTitleTextAria' value={editProjectTitle} onChange={editProjectTitleF} />
                                </td>
                            </tr>
                            <tr className='AddProjectEnterDiscription'>
                                <td><label>Enter Project Discription</label></td>
                            </tr>
                            {/* <tr>
                                <td>
                                    <div className='ProjectDetailsStyleDiv'>
                                        <button>B</button>
                                        <button><i>I</i></button>
                                    </div>
                                </td>
                            </tr> */}
                            <tr className='AddProjectDetailsTR'>
                                <td className='AddProjectDetailsRequire'>
                                    <p style={{ marginBottom: '0', color: 'red' }}>* Required</p>
                                    <textarea className='AddProjectDiscriptionAria' value={editProjectDiscription} onChange={editProjectDiscriptionF} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='adminButtonFirst'>
                        <button id='adminBTN1' className='adminBTN1' type='submit' onMouseDown={adminButtonClicked} onMouseUp={adminButtonUp} onClick={AddProjectsSubmited} >Submit</button>
                        <button id='adminBTN2' className='adminBTN2' type='reset' onMouseDown={adminButtonClicked} onMouseUp={adminButtonUp} >Reset</button>
                    </div>
                </form>
            </div>
            {
                getdata1.map((value, index) => {
                    return (
                        <div key={index} className='addContentUpdateDiv'>
                            <div className='addContentTop'>
                                <div>{index + 1}</div>
                                <div>{value.projectTitle}</div>
                            </div>
                            <div className='addContentBottom'>
                                <button className='addContentBottomBTN' onClick={() => { addProjectDeleted(value._id, index) }}>DELETE</button>
                                <div>Object id - {value._id}</div>
                                <Link to={`/admin/edit/${index}`}>
                                    <button className='addContentBottomBTN'>UPDATE</button>
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default AddProjects;
