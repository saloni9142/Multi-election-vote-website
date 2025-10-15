import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { uiActions } from '../store/ui-slice'


const AddElectionModal = ({ onClose }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState("")

    const dispatch=useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add your form submission logic here
        console.log({ title, description, thumbnail })
    }

    // close add election modal
    const closeModal =() =>{
        dispatch(uiActions.closeElectionModal())

    }

    return (
        <section className='modal'>
            <div className='modal_content'>
                <header className='modal_header'>
                    <h4>create new election</h4>
                    <button className='modal_close' onClick={closeModal} >
                        <IoMdClose/>
                    </button>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h6>election title: </h6>
                        <input 
                            type="text" 
                            value={title}  
                            onChange={e => setTitle(e.target.value)} 
                            name='title'
                        />
                    </div>
                    <div>
                        <h6>election description:</h6>
                        <input 
                            type="text" 
                            value={description}  
                            name='description' 
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <h6>election thumbnail:</h6>
                        <input 
                            type="file"  
                            name='thumbnail' 
                            onChange={e => setThumbnail(e.target.files[0])} 
                            className='btn-primary' 
                            accept=".png, .jpg, .jpeg, .webp, .avif" 
                        />
                    </div>
                    <button type="submit" className='btn primary'>
                        Add election
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddElectionModal