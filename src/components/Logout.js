import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
const Logout=(props)=>{
    const {setLoggedIn}=props
    useEffect(()=>{
        
        window.localStorage.removeItem("JwtToken")
        alert('You have logged out')
        setLoggedIn(false)
        props.history.push('/login')
    },[])
    return (
        <div>
            
        </div>
    )
}

export default withRouter(Logout)