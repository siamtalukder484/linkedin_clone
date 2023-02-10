import React, { useState } from 'react'
import Box from '../../components/Box'
import Flex from '../../components/Flex'
import Images from '../../components/Images'
import Input from '../../components/Input'
import Peragraph from '../../components/Peragraph'
import Title from '../../components/Title'
import Button from '../../components/Button'
import Authentication from '../../components/Authentication'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import "../login/style.css"

const Index = () => {
  let [showPass, setShowPass] = useState(false);
  let [showCPass, setShowCPass] = useState(false);
  return (
    <Flex className="box_main">
            <Box className='box'>
                <Box className='logo_holder'>
                    <Images src="./assets/images/logo.png"/>
                </Box>
                <Box className='login_title'>
                    <Title className="auth_title" title="Registration"/>
                    <Peragraph className="auth_subtitle" title="First register and you can enjoy it"/>
                </Box>
                <form className='form' action='' method=''>
                    <Box className="input_group">
                        <Input className="login_input" type="email" placeholder="Email Address"/>
                    </Box>
                    <Box className="input_group">
                        <Input className="login_input" type="text" placeholder="Full Name"/>
                    </Box>
                    <Box className="input_group">
                        <Input className="login_input" type={showPass ? "text" : "password"} placeholder="Password"/>
                        {showPass 
                        ?
                        <AiFillEye onClick={()=>setShowPass(false)} className='openeye'/>
                        :
                        <AiFillEyeInvisible onClick={()=>setShowPass(true)} className='openeye'/>
                        }
                    </Box>
                    <Box className="input_group">
                        <Input className="login_input" type={showCPass ? "text" : "password"} placeholder="Confirm Password"/>
                        {showCPass 
                        ?
                        <AiFillEye onClick={()=>setShowCPass(false)} className='openeye'/>
                        :
                        <AiFillEyeInvisible onClick={()=>setShowCPass(true)} className='openeye'/>
                        }
                    </Box>
                    <Button className="login_btn" title="sign up"/>
                </form>
                <Authentication className='reg_auth' title='Already have an account?' href='/' hreftitle='sign in'/>
            </Box>
        </Flex>
  )
}

export default Index