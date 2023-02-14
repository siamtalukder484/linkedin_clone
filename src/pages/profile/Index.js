import React from 'react'
import Flex from '../../components/Flex'
import Images from '../../components/Images'
import {BsFillCameraFill} from "react-icons/bs"
import { useDispatch,useSelector } from 'react-redux'
import "./style.css"

const Profile = () => {
    let data= useSelector(state => state)
    return (
    <>
        <Flex className="container">
            <Flex className="cover_photo">
                <Images src="assets/images/profile_cover.jpg"/>
                <button><BsFillCameraFill/><span>Edit Cover Photo</span></button>
            </Flex>
            <Flex className="profile_photo_wrapper">
                <Flex className="profile_photo_holder">
                    <Images src="assets/images/profile_avatar.png"/>
                    <Flex className="profile_img_icon">
                        <BsFillCameraFill/>
                    </Flex>
                </Flex>
                <Flex className="profile_owner_name">
                    <h2>{data.userData.userInfo.displayName}</h2>
                    <h4>100 Friends</h4>
                </Flex>
            </Flex>
        </Flex>
    </>
  )
}

export default Profile