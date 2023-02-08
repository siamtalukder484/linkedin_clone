import React from 'react'
import "./style.css"

const Index = () => {
  return (
    <>
        <div className='box_main'>
            <div className='box'>
                <div className='logo_holder'>
                    <img src='./assets/images/logo.png' alt='img'/>
                </div>
                <div className='login_title'>
                    <h2>Login</h2>
                    <p>First register and you can enjoy it</p>
                </div>
                <form className='form' action='' method=''>
                    <input type="text" placeholder='Enter your Email'/>
                    <input type='password' placeholder='Enter your Password'/>
                    <button type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Index