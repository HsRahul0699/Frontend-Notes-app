import axios from 'axios'
import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const NotesForm=(props)=>{
    const {insertFunc}=props
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [flag,setFlag]=useState(false)
    const [formError,setFormError]=useState({})
    const errors={}
    const handleChange=(e)=>{
        const n=e.target.name
        const val=e.target.value
        n=='title'?setTitle(val):setBody(val)
    }
    const runValidations=()=>{
        if(title.length==0){
            errors.title='Title cannot be empty'
           
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length!==0){
            
            setFormError(errors)
        }
        else {
            setFormError({})
            
            const obj={title,body}
            axios.post('http://dct-user-auth.herokuapp.com/api/notes',obj,{
                headers:{
                    
                    "x-auth":localStorage.getItem('JwtToken')
                }
            })
            .then((res)=>{
                const resultData={
                    _id:res.data._id,
                    title:res.data.title,
                    body:res.data.body,
                    user:res.data.user,
                    __v:res.data.__v
                }
                insertFunc(resultData)
                setTitle('')
                setBody('')
                console.log('Insert success',res.data)
            })
            .catch((err)=>{
                console.log('error posting',err.message)
            })
        }
    }
    return (

        <div className='h-50 '>
            <h1>Add Note</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' className='form-control' value={title}name='title' placeholder="Add Title" onChange={handleChange}/>{formError.title&&<span style={{color:'red'}}>Title cannot be empty</span>}<br /><br />
                <textarea className='form-control' name='body' value={body}placeholder="Add Note" onChange={handleChange} /><br /><br />
                <button type='submit' className='btn btn-primary'>Save</button><br />
            </form>
        </div>
    )
}

export default NotesForm