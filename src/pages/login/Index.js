import React, { useState } from 'react'
// import Box from '../../components/Box'
import Flex from '../../components/Flex'
import Images from '../../components/Images'
import Input from '../../components/Input'
import Peragraph from '../../components/Peragraph'
import Title from '../../components/Title'
import Button from '../../components/Button'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import {RxCross2} from "react-icons/rx"
import Authentication from '../../components/Authentication'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';
import "./style.css"


const Index = () => {
    let [showPass, setPass] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let handleforgotexitbtn(()=>{
      console.log("aci")

    })
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 475,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    
  return (
    <>
        <Flex className="box_main">
            <Flex className='box'>
                <Flex className='logo_holder'>
                    <Images src="./assets/images/logo.png"/>
                </Flex>
                <Flex className='login_title'>
                    <Title className="auth_title" title="login"/>
                    <Peragraph className="auth_subtitle" title="First login and you can explore it"/>
                </Flex>
                <form className='form' action='' method=''>
                    <Flex className="input_group">
                        <Input className="login_input" type="email" placeholder="Email Address"/>
                    </Flex>
                    <Flex className="input_group">
                        <Input className="login_input" type={showPass ? "text" : "password"} placeholder="Password"/>
                        {showPass 
                        ?
                        <AiFillEye onClick={()=>setPass(false)} className='openeye'/>
                        :
                        <AiFillEyeInvisible onClick={()=>setPass(true)} className='openeye'/>
                        }
                    </Flex>
                    <Button className="login_btn" title="sign in"/>
                </form>
                <Authentication className='reg_auth' title="Don't have an account?" href='/registration' hreftitle='sign up'/>
                <Authentication onClick={handleOpen} className='reg_auth forgot_auth' title="Reset your password?" hreftitle='Click here'/>
                <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography style={{display: "flex", alignItems: "center",justifyContent:"space-between", padding: "5px 0 5px 0"}} id="modal-modal-title" variant="h6" component="h2">
                          <Title className="auth_title forgot_title" title="Forgot Password"/>
                          <Flex onClick={handleforgotexitbtn} className="forgot_exit_btn">
                            <RxCross2/>
                          </Flex>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <Input className="login_input" type="email" placeholder="Email Address"/>
                          <Button className="login_btn forgot_btn" title="Send Mail"/>
                        </Typography>
                      </Box>
                    </Modal>
            </Flex>
        </Flex>
    </>
  )
}

export default Index