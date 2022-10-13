import axios from 'axios'
import React,{useState} from 'react'
import { withRouter } from 'react-router-dom'

const Register=(props)=>{
    
    const [uname,setUname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   
    const handleSubmit=(e)=>{
        e.preventDefault()
        let formData={
            username:uname,email,password
        }
       
        //setDetails(obj)
        axios.post('http://dct-user-auth.herokuapp.com/users/register',formData)
        .then((res)=>{
            const response=res.data
            if(response.hasOwnProperty('errors')){
                alert(response.message)
            }
            else {
                alert('Registration complete, redirecting to login page')
                
                
                props.history.push('/login')
            }
        })
    }
    const handleChange=(e)=>{
        const val=e.target.name
        val=='uname'?setUname(e.target.value):val=='email'?setEmail(e.target.value):setPassword(e.target.value)
    }
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' name='uname' placeholder='enter username' value={uname} onChange={handleChange} /><br />
            <input type='text' name='email' placeholder='enter email' value={email} onChange={handleChange} /><br />
            <input type='password' name='password' placeholder='enter password' value={password} onChange={handleChange} /><br />
            <input type='submit'/>
        </form>
    </div>
    )
}

export default withRouter(Register)