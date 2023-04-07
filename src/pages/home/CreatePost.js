import React from 'react'
import "./createpost.css"
import Images from '../../components/Images'
import { useDispatch,useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {RiLiveLine} from "react-icons/ri"
import {TbPhoto} from "react-icons/tb"
import {MdOutlineEmojiEmotions} from "react-icons/md"
import {RxCross2} from "react-icons/rx"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Peragraph from '../../components/Peragraph'
import Title from '../../components/Title'
import Button from '../../components/Button'
import Flex from '../../components/Flex'
import Input from '../../components/Input'

const CreatePost = () => {
    let data= useSelector(state => state)
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleforgotexitbtn = () => {
    setOpen(false)
  }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 580,
        bgcolor: 'background.paper',
        border: '0',
        boxShadow: 24,
        p: 0,
        borderRadius: 2,
      };


  return (
    <>
        <div className='post_wrapper'>
            <div className='post_input_group'>
                <NavLink to="/profile">
                    <div className='post_owner_img'>
                        <Images src={data.userData.userInfo.photoURL}/>
                    </div>
                </NavLink>
                <div onClick={handleOpen} className='post_input_box'>
                    <span className='post_input_placeholder'>
                        What's on your mind, {data.userData.userInfo.displayName}?
                    </span>
                </div>
            </div>
            <div className='post_actions'>
                <div className='post_actions_item'>
                    <RiLiveLine/>
                    <span>Live video</span>
                </div>
                <div className='post_actions_item'>
                    <TbPhoto/>
                    <span>Photo/video</span>
                </div>
                <div className='post_actions_item'>
                    <MdOutlineEmojiEmotions/>
                    <span>Feling/activity</span>
                </div>
            </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    
                      <Box sx={style}>
                        <div className='create_post_head'>
                            <Title className="create_post_title" title="Create Post"/>
                            <Flex onClick={handleforgotexitbtn} className="forgot_exit_btn post_exit_btn">
                                <RxCross2/>
                            </Flex>
                        </div>
                        <div className='create_post_body'>
                            <div className='post_creator'>
                                <NavLink to="/profile">
                                    <div className='post_owner_img'>
                                        <Images src={data.userData.userInfo.photoURL}/>
                                    </div>
                                </NavLink>
                                <div className='creator_name'>
                                    <h3>{data.userData.userInfo.displayName}</h3>
                                </div>
                            </div>
                            <textarea placeholder="What's on your mind, UserName Here..?" className="post_input_text">

                            </textarea>
                            <Button className="post_btn" title="Post"/>
                        </div>
                      </Box>
                </Modal>
        </div>
    </>
  )
}

export default CreatePost