import React,{useState,useEffect} from 'react'
import {Link,Route} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Account from './components/Account'
import MyNotes from './components/MyNotes'
import PrivateRoute from './components/PrivateRoute'
import 'bootstrap/dist/css/bootstrap.min.css';

const App=(props)=>{
  const [loggedIn,setLoggedIn]=useState(false)
  
  useEffect(()=>{
    if(localStorage.getItem('JwtToken')){
      setLoggedIn(true)
    }
  },[])
  return (
    <div className='container'>
      <h1 id='header'>User Auth</h1>
      <div className='text-end'>
      <Link to='/' >Home</Link><span> | </span>
      {loggedIn?<><Link to='/account'>Account</Link><span> | </span></>:<><Link to='/register'>Register</Link><span> | </span></>}
      {loggedIn&&<><Link to='/mynotes'>My Notes</Link><span> | </span></>}
      {loggedIn?<Link to='/logout' >Logout</Link>:<Link to='/login' >Login</Link>}
      
      </div>
     
      <Route path='/' component={Home} exact={true} />
     
      <Route path='/register' render={(props)=>{
        return <Register/>}
      } />
      <Route path='/login' render={(props)=>{
        return <Login {...props} setLoggedIn={setLoggedIn} />} 
       } />
      <PrivateRoute path='/account' render={(props)=>{
        return <Account {...props} />
      }} />
      {/* <Route path='/login' component={Login} /> */}
      <Route path='/logout' render={(props)=>{
        return <Logout {...props}setLoggedIn={setLoggedIn} />}} />
      <PrivateRoute path='/mynotes' render={(props)=>{
        return <MyNotes {...props} />
      }} />

    </div>
  )
}

export default App