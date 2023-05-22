import React, { useEffect } from 'react'
import "./message.css"
import {RxCross2} from "react-icons/rx"
import {BiMinus} from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import {AiFillLike} from "react-icons/ai"
import {RiSendPlane2Fill} from "react-icons/ri"
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { activeUser } from '../../slices/activeChatSlice'
import Images from '../../components/Images'
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import ScrollToBottom from 'react-scroll-to-bottom';
import {BsEmojiSmile} from 'react-icons/bs'
import EmojiPicker from 'emoji-picker-react';

const Message = () => {
    
    let dispatch = useDispatch();
    const db = getDatabase();
    let data = useSelector((state)=>state)
    let [minimize, setMinimize] = useState(false)
    let [boxexit, setBoxexit] = useState(false)
    let [msg,setMsg] = useState("")
    let [msgList, setMsgList] = useState([])
    let [showemoji, setShowemoji] = useState(false);


let handleMinimize = () => {
    if(minimize == false){
        setMinimize(true)
    }else{
        setMinimize(false)
    }
}
let handleExit = () => {
    dispatch(activeUser(null))  
    if(boxexit == false){
        setBoxexit(true)
    }else{
        setBoxexit(false)
    }
}


//one by one msg operation
let handleSendMsg = () => {
      if(data.activeChatUser.activeUser.status == "singlemsg"){
        set(push(ref(db, 'onebyonemsg')), {
          whosendid: data.userData.userInfo.uid,
          whosendname: data.userData.userInfo.displayName,
          whoreceivedid: data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid 
            ?
            data.activeChatUser.activeUser.receiverid 
            :
            data.activeChatUser.activeUser.senderid
          ,
          whoreceivedname: data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid 
            ?
            data.activeChatUser.activeUser.receivername 
            :
            data.activeChatUser.activeUser.sendername
          , 
          message: msg,
          date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        }).then(()=>{
          setMsg("")
          setShowemoji(false)
        })
      }
  }

  //Enter key press msg send
    let handleKeyPress = (e) => {
        if(e.key == "Enter"){
            if(data.activeChatUser.activeUser.status == "singlemsg"){
                set(push(ref(db, 'onebyonemsg')), {
                  whosendid: data.userData.userInfo.uid,
                  whosendname: data.userData.userInfo.displayName,
                  whoreceivedid: data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid 
                    ?
                    data.activeChatUser.activeUser.receiverid 
                    :
                    data.activeChatUser.activeUser.senderid
                  ,
                  whoreceivedname: data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid 
                    ?
                    data.activeChatUser.activeUser.receivername 
                    :
                    data.activeChatUser.activeUser.sendername
                  , 
                  message: msg,
                  date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
                }).then(()=>{
                  setMsg("")
                  setShowemoji(false)
                })
              }
        }
    }

    let handleSendLike = () => {
        
        if(data.activeChatUser.activeUser.status == "singlemsg"){
            set(push(ref(db, 'onebyonemsg')), {
              whosendid: data.userData.userInfo.uid,
              whosendname: data.userData.userInfo.displayName,
              whoreceivedid: data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid 
                ?
                data.activeChatUser.activeUser.receiverid 
                :
                data.activeChatUser.activeUser.senderid
              ,
              whoreceivedname: data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid 
                ?
                data.activeChatUser.activeUser.receivername 
                :
                data.activeChatUser.activeUser.sendername
              , 
              like: "&#128077;",
              date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
            }).then(()=>{
              setMsg("")
            })
          }
    }

  useEffect(()=>{
    const starCountRef = ref(db, 'onebyonemsg');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        let id = data.activeChatUser.activeUser.receiverid == data.userData.userInfo.uid ?
            data.activeChatUser.activeUser.senderid : data.activeChatUser.activeUser.receiverid;
        snapshot.forEach(item=>{
          if((item.val().whosendid == data.userData.userInfo.uid && item.val().whoreceivedid == id) || (item.val().whosendid == id && item.val().whoreceivedid == data.userData.userInfo.uid)){
            arr.push(item.val())  
          }
        })
        setMsgList(arr)
    });
},[data.activeChatUser.activeUser])
 
let handleEmoji = (e) => {
    setMsg(msg + e.emoji)
  }

  return (
    <>
        <div className={boxexit ? "main_box exit" : minimize ? "main_box close" : "main_box"}>
            <div className='box_head'>
                <div className='user_info'>
                    <div className='user_img_box'>
                        <img/>
                    </div>
                    <div className='user_name'>
                        {data.userData.userInfo.uid == data.activeChatUser.activeUser.senderid
                        ?
                        <h3>{data.activeChatUser.activeUser.receivername}</h3>
                        :
                        <h3>{data.activeChatUser.activeUser.sendername}</h3>
                        }
                        <p>Active now</p>
                    </div>
                </div>
                <div className='user_action'>
                    <div onClick={handleMinimize} className="msg_minimize_btn">
                        <BiMinus/>
                    </div>
                    <div onClick={handleExit} className='msg_exit_btn'>
                        <RxCross2/>
                    </div>
                </div>
            </div>
            <ScrollToBottom className='box_body'>
                {msgList.map((item)=>(
                     item.whosendid == data.userData.userInfo.uid
                     ?
                        <div className='send_msg'>
                            <div className='send_text_box'>
                                <span className='send_msg_action'>
                                    <BsThreeDotsVertical/>
                                </span>
                                {item.message
                                ?
                                <p>{item.message}</p>
                                :
                                <p
                                    dangerouslySetInnerHTML={{
                                    __html: item.like,
                                    }} className='msg_like_emoji'></p>
                                }
                                
                            </div>
                        </div>
                     :
                        <div className='receive_msg'>
                            <div className='receive_text_box'>
                                <span className='receive_msg_action'>
                                    <BsThreeDotsVertical/>
                                </span>
                                <p>{item.message}</p>
                            </div>
                        </div>
                ))}
                 {/* <div className='send_msg'>
                    <div className='send_text_box'>
                        <span className='send_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <Images className="send_msg_img" src="assets/images/profile_avatar.png"/>
                    </div>
                </div> */}
            </ScrollToBottom>
            <div className='box_footer'>
                <div className='voice_box'>
                </div>
                <div className='media_box'>
                    <input onKeyUp={handleKeyPress} onChange={(e)=>setMsg(e.target.value)} value={msg} className='input_box'/>
                    <div className='msg_emoji'>
                        <BsEmojiSmile onClick={()=>setShowemoji(!showemoji)}/>
                        {showemoji &&
                            <div className='msg_emoji_box'>
                                <EmojiPicker onEmojiClick={(e)=>handleEmoji(e)}/>
                            </div>
                        }
                    </div>
                </div>
                <div className='send_btn'>
                    {msg != "" 
                      ?
                      <div onClick={handleSendMsg} className='send_icon'>
                          <RiSendPlane2Fill/>
                      </div>
                      :
                      <div onClick={handleSendLike} className='like_icon'>
                          <AiFillLike/>
                      </div>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Message