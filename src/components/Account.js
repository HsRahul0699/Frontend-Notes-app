import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const Account=(props)=>{
    const [userData,setUserData]=useState({})
    useEffect(()=>{
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
            headers:{
                'x-auth':localStorage.getItem('JwtToken')
            }
        })
        .then((res)=>{
            console.log(res.data)
            setUserData(res.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])
  
    return (
        <div>
           <h1>Username : {userData.username}</h1>
           <h1>Email : {userData.email}</h1>
           {Object.keys(userData).length>0&&<h1>Joined : {userData.createdAt.slice(0,10)}</h1>}
        </div>
    )
}

export default withRouter(Account)