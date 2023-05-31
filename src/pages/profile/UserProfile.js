import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import Flex from '../../components/Flex';
import Images from '../../components/Images';
import {BsFillCameraFill,BsGlobeAmericas} from "react-icons/bs";
import { useSelector,useDispatch } from 'react-redux';
import { getDatabase, ref, onValue, set, push,remove} from "firebase/database";
import PostCard from './PostCard';

const UserProfile = () => {
  
  const { id } = useParams();
  let data = useSelector(state => state)
  let [userlist,setUserlist] = useState([])
  let db = getDatabase()
  let [friends, setfriends] = useState([])
  let [post, setPost] = useState([])
  let [biotext, setBiotext] = useState([])

    useEffect(()=>{
      const usersRef = ref(db, 'users');
      onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach(item=>{
              if(id == item.key){
                  arr.push({
                      ...item.val(), 
                      id:item.key,
                  })
              }
          })
          setUserlist(arr)
      });
  },[])
  useEffect(()=>{
    const starCountRef = ref(db, 'friends');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(id == item.val().receiverid || id == item.val().senderid){
                arr.push({...item.val(),id:item.key})
            } 
        })
        setfriends(arr)
    });
  },[])

  useEffect(()=>{
    const starCountRef = ref(db, 'post');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
          if(item.val().whopostid == id){
            arr.push({...item.val(),id:item.key})
          }
        })
        setPost(arr)
    });
  },[])

  useEffect(()=>{
    const starCountRef = ref(db, 'bio');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
          if(item.val().whobioid == id){
            arr.push({...item.val(),id:item.key})  
          }
        })
        setBiotext(arr)
    });
  },[])


  return (
    <>
    <Flex className="container">
        <Flex className="cover_photo">
            <Images src="assets/images/profile_cover.jpg"/>
        </Flex>
        <Flex className="profile_photo_wrapper">
            <div className='photo_and_name_wrapper'>
              <Flex className="profile_photo_holder">
                  <Images src="assets/images/profile_avatar.png"/>
              </Flex>
              <Flex className="profile_owner_name">
                {userlist.map(item=>(
                  <h2>{item.displayName}</h2>
                ))}
                  <h4>{friends.length} Friends</h4>
              </Flex>
            </div>
            <div>
              <a href='#' className='profile_dashboard'>Message</a>
            </div>
        </Flex>
        <Flex className="profile_body">
            <Flex className="profile_intro">
                <h2>Intro</h2>
                <Flex className="bio_box">
                  {
                    biotext.map(item=>(
                      <p value={item.biotext}>{item.biotext}</p>
                    ))
                  }
                </Flex>
            </Flex>
            <div className='post_main'>
              <Flex className="profile_post_wrapper">
                    {
                      post.length > 0 
                      ?
                      post.map(item=>(
                        <PostCard postid={item.id} postdate={item.date} creatorname={item.whopostname} creatorid={item.whopostid} posttext={item.posttext} item={item}/>
                      ))
                      :
                      <h3>No Post Available</h3>
                    }
              </Flex>
            </div>
        </Flex> 

    </Flex>
    
    </>
  )
}

export default UserProfile