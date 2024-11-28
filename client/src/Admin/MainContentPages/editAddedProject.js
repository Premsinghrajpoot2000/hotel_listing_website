import './editAddedProject.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

function EditAddedProject() {

    const { index } = useParams()
    const [editProfileName, setEditProfileName] = useState('');
    const [editProfileUsername, setEditProfileUsername] = useState('');
    const [EditProjectImage, setEditProjectImage] = useState(null);
    const [EditProjectLogo1, setEditProfileLogo1] = useState(null);
    const [editProjectLIkes, setEditProjectLIkes] = useState('');
    const [editProjectTitle, setEditProjectTitle] = useState('');
    const [editProjectDiscription, setEditProjectDiscription] = useState('');
    const [getdata1, setGetdata1] = useState(null)

    useEffect(() => {
        const Database = async () => {
            try {
                let FirstDataGet = await axios.get(`https://hotel-listing-website-server.onrender.com/getAdded`)
                setGetdata1(FirstDataGet.data)
            } catch (error) {
                console.log(error)
            }
        }
        Database()
    }, [])

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

    let loading = document.querySelector('.editAddProjectLoadingDiv')
    let PostDataBase = async (AllData) => {
        try {
            let ProjectImageLInk = getdata1[index].ProjectImage
            let ProjectImageArray = ProjectImageLInk.split('/')
            let ProjectImage = ProjectImageArray[ProjectImageArray.length - 1].split('.')[0]

            let ProfileLogoLink = getdata1[index].ProfileLogo
            let ProfileLogoArray = ProfileLogoLink.split('/')
            let ProfileLogo = ProfileLogoArray[ProfileLogoArray.length - 1].split('.')[0]

            let ObjID = getdata1[index]._id
            await axios.patch(`https://hotel-listing-website-server.onrender.com/patchEditAddedProject/${ObjID}?ProjectImage=${ProjectImage}&ProfileLogo=${ProfileLogo}`, AllData)
            loading.className = 'editAddProjectLoadingDiv'
        } catch (error) {
            console.log(error)
        }
    }

    function AddProjectsSubmited(event) {
        event.preventDefault();

        if (editProfileName !== '' || editProfileUsername !== '' || editProjectLIkes !== '' || editProjectTitle !== '' || editProjectDiscription !== '' || EditProjectImage !== null || EditProjectLogo1 !== null) {
            const formData = new FormData();

            if (editProfileName !== undefined) {
                formData.append('Name', editProfileName);
            }
            if (editProfileUsername !== undefined) {
                formData.append('userName', editProfileUsername);
            }
            if (editProjectLIkes !== undefined) {
                formData.append('likes', editProjectLIkes);
            }
            if (editProjectTitle !== undefined) {
                formData.append('projectTitle', editProjectTitle);
            }
            if (editProjectDiscription !== undefined) {
                formData.append('projectDiscription', editProjectDiscription);
            }
            if (EditProjectImage !== undefined) {
                formData.append('ProjectImage', EditProjectImage);
            }
            if (EditProjectLogo1 !== undefined) {
                formData.append('ProfileLogo', EditProjectLogo1);
            }
            PostDataBase(formData);
            setEditProfileName('')
            setEditProfileUsername('')
            document.getElementById('editProfileLogoInput').value = null;
            document.getElementById('editProjectImageInput').value = null;
            setEditProjectLIkes('')
            setEditProjectTitle('')
            setEditProjectDiscription('')
            loading.className = 'editAddProjectLoading'
        } else {
            alert('Please Fill This Form')
        }
    };
    const navigate = useNavigate();
    function handleExitButtonClick() {
        navigate('/admin');
    }
    if (!getdata1) {
        return (
            <div className='FirstProjectLoadingBefore'>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
                <div>
                    Loading
                    <i className="fa-solid fa-ellipsis fa-fade"></i>
                </div>
            </div>
        )
    }

    return (
        <div className='editAddProjectRelative'>
            <div className='editAddProjectLoadingDiv'>
                <i className="fa-duotone fa-spinner-third fa-spin"></i>
            </div>
            <button className='ExitButton' onClick={handleExitButtonClick}><i className="fa-solid fa-left-to-bracket"></i> Exit</button>
            <div className='editAddProjectsDiv'>
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
                                    <textarea className='ProjectTitleTextAria' value={editProjectTitle} onChange={editProjectTitleF} />
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
                                    <textarea className='ProjectDiscriptionAria' value={editProjectDiscription} onChange={editProjectDiscriptionF} />
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
        </div>
    )
}

export default EditAddedProject