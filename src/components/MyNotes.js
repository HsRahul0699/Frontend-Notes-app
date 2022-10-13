import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NotesForm from './NotesForm'
import NotesItem from './NotesItem'
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNotes=(props)=>{
    const [notes,setNotes]=useState([])
    console.log('notes is',notes)
    const insertFunc=(data)=>{
      const res=[data,...notes]
      console.log('inserted data',res)
      setNotes(res)  
    }
    const deleteFunc=(dataId)=>{
        console.log('id',dataId)
        const res=notes.filter((ele)=>{
            return ele._id!==dataId
        })
        setNotes(res)
       
    }
    useEffect(()=>{
        axios.get('https://dct-user-auth.herokuapp.com/api/notes',{
            headers:{
                "x-auth":localStorage.getItem('JwtToken')
            }
        })
        .then((res)=>{
            
            if(Object.keys(res.data).length>0){
                
                setNotes(res.data)
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])
    return (
        <div className='container'>

            <h1>My Notes</h1>
            <div className='row'>
                <div className='col-md-6'>
            {Object.keys(notes).length>0?
             notes.map((ele)=>{
                console.log('this id',ele.title,ele._id)
                return <NotesItem key={ele._id}_id={ele._id}title={ele.title} body={ele.body} deleteFunc={deleteFunc}/>
             })  
            :(
            <React.Fragment>
                <h1>No notes found. Add your first note</h1>
            </React.Fragment>
                
            )}
            </div>
            <div className='col-md-6 border border-secondary p-4' >
                <NotesForm insertFunc={insertFunc}/>
            </div>
            
            </div>
        </div>
    )
}

export default MyNotes