import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LockFill } from 'react-bootstrap-icons';

const Login=(props)=>{
    const {setLoggedIn}=props
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const [jwt,setJwt]=useState('')
    console.log('jwt',jwt)
    let errors={}
    const [formError,setFormError]=useState({})
    const [formData,setformData]=useState({})
    
    useEffect(()=>{
        if(jwt){
            localStorage.setItem('JwtToken',jwt)
        }
    },[jwt])
    const runValidations=()=>{
        if(password.trim().length==0){
           errors.password='Password cannot be empty'
        }
        
         if(email.trim().length==0){
            errors.email='Email cannot be empty'
        }
        else if(!(email.includes('@')&&email.includes('.com'))){
            errors.email='Invalid format'
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length==0){
            setFormError({})
            let obj={
                email,password
            }
            setformData(obj)
            
        }
        else{
            setFormError(errors)
        }
        if(Object.keys(formError)==0){
            
        console.log('formmdata',formData)
        let obj ={
            email,password
        }
        axios.post('http://dct-user-auth.herokuapp.com/users/login',obj)
        .then((res)=>{
            console.log('login data',res.data)
            if(res.data.hasOwnProperty('token')){
                setJwt(res.data.token)
                setLoggedIn(true)
                alert('Login successful, redirecting to home page')
                if(props.history.push!=undefined){
                    
                    props.history.push('/')
                }
                
            }
            else if(res.data.hasOwnProperty('erros')){
                alert('Please retry',res.data.errros)
            }
        })
        .catch((err)=>{
            console.log('login err',err.message)
            
        })
    
        }
    }
    
    const handleChange=(e)=>{
        const val=e.target.name
        console.log('val',e.target.value)
        val=='email'?setEmail(e.target.value):setPassword(e.target.value)
    }
    return (
        <div className='container  '>
        <div className='row'>
            <div className='col-md-6 border border-dark p-5 mt-2'>
                <form onSubmit={handleSubmit}>
                    <input type='text'className='form-control' name='email'placeholder='enter email' value={email} onChange={handleChange} required/>
                    {formError.email&&<span style={{color:'red'}}>{formError.email}</span>}
                    <br />
                    <input type='password'className='form-control' name='password' placeholder='enter password' value={password} onChange={handleChange} required/>
                    {formError.password&&<span style={{color:'red'}}>Password cannot be empty</span>}
                    <br />
                    <input type='submit' className='btn btn-success'/>
                </form>
            </div>
            </div>
        </div>
    )
}

export default withRouter(Login)