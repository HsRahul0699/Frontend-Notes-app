import React,{useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TrashFill } from 'react-bootstrap-icons';

const NotesItem=(props)=>{
    const {_id,title,body,deleteFunc}=props
    console.log('notes item id',_id)
    const handleDelete=(id)=>{
        console.log('inside delete func',_id)
        
        axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`,{
            headers:{
                "x-auth":localStorage.getItem('JwtToken')
            }
        })
        .then((res)=>{
            console.log(res.data)
            deleteFunc(_id)
        })
        .catch((err)=>{
            alert(err.message)
        })
    
}
    const handleClick=(id)=>{
        console.log('inside click func',_id)
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`,{
            headers:{
                "x-auth":localStorage.getItem('JwtToken')
            }
        })
        .then((res)=>{
            if(Object.keys(res.data).length>0){
                
                swal(`${res.data.title}`,`${res.data.body}`)
            }
            else {
                console.log('empty',res.data)
            }
       
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    
    return (
        <div className='border border-secondary p-4 mb-5 '>
            
            <h1 onClick={handleClick}>{body}</h1>
            <button id='button'className='btn btn-warning' onClick={()=>{handleDelete(_id)}} ><TrashFill /></button>
        </div>
    )
}

export default NotesItem 