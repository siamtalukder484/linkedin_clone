import React from 'react'
import "./style.css"
import Flex from '../../components/Flex'
import Images from '../../components/Images'
import { NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {AiOutlineLike} from "react-icons/ai"
import {RiShareForwardLine} from 'react-icons/ri'
import {VscComment} from 'react-icons/vsc'

const PostCard = ({posttext,creatorname,postdate}) => {

    let data= useSelector(state => state)

  return (
    <>
        <Flex className="profile_post_item">
            <Flex className="post_head">
                <NavLink to="/profile">
                <div className='post_owner_img'>
                    <Images src={data.userData.userInfo.photoURL}/>
                </div>
                </NavLink>
                <div>
                <NavLink to="/profile">
                    <h4>{creatorname}</h4>
                </NavLink>
                <span className='post_date'>{postdate}</span>
                </div>
            </Flex>
            <p>{posttext}</p>
            <Flex className="post_actions_count">
                <Flex className="likes_count">
                    <span>100 Likes</span>
                </Flex>
                <Flex className="comments_count">
                    <span>22 Comment</span>
                </Flex>
            </Flex>
            <Flex className="post_actions_btn">
                <div className='like_btn'>
                    <AiOutlineLike/>
                    <span>Like</span>
                </div>
                <div className='like_btn'>
                    <VscComment/>
                    <span>Comment</span>
                </div>
                <div className='like_btn'>
                    <RiShareForwardLine/>
                    <span>Share</span>
                </div>
            </Flex>
        </Flex>
    </>
  )
}

export default PostCard