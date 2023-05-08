import React, { useState,useEffect } from 'react'
import "./style.css"
import Flex from '../../components/Flex'
import Images from '../../components/Images'
import { NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {AiOutlineLike,AiFillLike} from "react-icons/ai"
import {RiShareForwardLine} from 'react-icons/ri'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {VscComment} from 'react-icons/vsc'
import { getDatabase, ref, onValue, set, push,remove} from "firebase/database";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';

const PostCard = ({posttext,creatorname,postdate,postid}) => {
    let [showMore, setShowMore] = useState(false);
    let MAX_LENGTH = 200;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

    let data= useSelector(state => state)
    let db = getDatabase()
    let [like,setLike] = useState([])
    let [likearr,setLikeArr] = useState([])

    let handleLike = () => {
        set(ref(db, 'like/'+(data.userData.userInfo.uid+postid)), {
            wholikeid: data.userData.userInfo.uid,
            wholikename: data.userData.userInfo.displayName,
            postid: postid,
          }).then(()=>{
            console.log("like done")
          })
    }

    let handleDisLike = (id)=>{
        console.log(id)
        remove(ref(db, 'like/'+id)).then(()=>{
            console.log("Delete Hoise")
        })
    }

    useEffect(()=>{
        const starCountRef = ref(db, 'like');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            let likearr = []
            snapshot.forEach(item=>{               
                if(postid == item.val().postid){
                    arr.push({...item.val(),likeid:item.key})
                    likearr.push(item.val().wholikeid+postid)
                }
            })
            setLike(arr)
            setLikeArr(likearr)
        });
    },[])


const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //post Delete Part
  let handlePostDelete = () => {
    remove(ref(db, 'post/'+ postid)).then(()=>{
        toast("Pose Deleted..");
    });
    setAnchorEl(null);
  }
  //Post Edit Part
  let handlePostEdit = () => {
    console.log("post edit")
  }

  return (
    <>
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
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
                <div 
                    className='profile_post_actions' 
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <BsThreeDotsVertical/>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <p className='post_action_item' onClick={handlePostEdit}>Edid</p>
                    <p className='post_action_item' onClick={handlePostDelete}>Delete</p>
                </Menu>
             
            </Flex>
             {posttext.length>MAX_LENGTH
             ?
             showMore ? (
                <>
                    <p>{posttext}</p>
                    <button onClick={toggleShowMore}>See Less</button>
                </>
            ) : (
                <p>
                    {posttext.substr(0, MAX_LENGTH)}
                    {posttext.length > MAX_LENGTH && "..."}
                    <button onClick={toggleShowMore}>See more</button>
                </p>
            )
            :
            <p>{posttext}</p>
        }
            <Flex className="post_actions_count">
                <Flex className="likes_count">
                    <span>{like.length} Likes</span>
                </Flex>
                <Flex className="comments_count">
                    <span>22 Comment</span>
                </Flex>
            </Flex>
            <Flex className="post_actions_btn">
                
                {  likearr.includes(data.userData.userInfo.uid+postid)
                ?
                <>
                    <div onClick={()=>handleDisLike(data.userData.userInfo.uid+postid)} className='like_btn liked'>
                        <AiFillLike/>
                        <span>Liked</span>
                    </div>
                </>
                :
                <div onClick={handleLike} className='like_btn'>
                    <AiOutlineLike/>
                    <span>Like</span>
                </div>
                }
                
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