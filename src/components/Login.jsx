import React, { useState } from 'react'
import './Login.css'

import { Link,useHistory } from 'react-router-dom'
import { auth } from '../firebase'


const Login = () => {

    const history = useHistory()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            if(auth) {
                history.push('/')
            }
        }).catch(error=> console.log(error))
    }

    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            //console.log(auth);
            if(auth) {
                history.push('/')
            }
        }).catch(error=> console.log(error))
    }

    return (
        <div className='login'>
            <Link to="/">
              <img
                    className="login-logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login-container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login-signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Service Sales
                </p>

                <button onClick={register} className='login-registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
