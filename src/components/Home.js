import React,{useState,useEffect} from 'react'
import img from './react-js-image.png'
import {Link} from 'react-router-dom'

const Home=(props)=>{
    const [loggedIn,setLoggedIn]=useState(false)
    
    useEffect(()=>{
        if(localStorage.getItem('JwtToken')){
            console.log('logged in ')
            setLoggedIn(true)
        }
        
        else{
            console.log('not available')
        }
    },[])
    return (
        <div>
            <h1>Home</h1>
            {loggedIn&&<h3 style={{color:'green',textAlign:'center'}}>Successfully logged in </h3>}
            <center><img src={img} alt='react js image' height='400px' width='700px'  /></center>

          
        </div>
    )
}

export default Home