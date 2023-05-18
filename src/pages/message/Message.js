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

const Message = () => {
    let data = useSelector((state)=>state.activeChatUser.activeUser)
    let dispatch = useDispatch();
    const db = getDatabase();
    let [minimize, setMinimize] = useState(false)
    let [boxexit, setBoxexit] = useState(false)
    let [msg,setMsg] = useState([])
    let [activeChat, setActiveChat] = useState([])
    // console.log(msg)

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

let handleActiveChat = () =>{
    setActiveChat({data, msgstatus: "singlemsg"});  
}

//one by one msg operation
let handleSendMsg = () => {
    console.log(activeChat);
    // if(msg.length > 0){
    //   if(activeChat.msgstatus == "singlemsg"){
    //     set(push(ref(db, 'onebyonemsg')), {
    //       whosendid: data.userData.userInfo.uid,
    //       whosendname: data.userData.userInfo.displayName,
    //       whoreceivedid: data.userData.userInfo.uid == activeChat.senderid 
    //         ?
    //         activeChat.receiverid 
    //         :
    //         activeChat.senderid
    //       ,
    //       whoreceivedname: data.userData.userInfo.uid == activeChat.senderid 
    //         ?
    //         activeChat.receivername 
    //         :
    //         activeChat.sendername
    //       , 
    //       message: msg,
    //       date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
    //     }).then(()=>{
    //       setMsg("")
    //     })
    //   }
    // }
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
                        <h3>{data?data.sendername:""}</h3>
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
            <div className='box_body'>
                <div className='send_msg'>
                    <div className='send_text_box'>
                        <span className='send_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg</p>
                    </div>
                </div>
                <div className='receive_msg'>
                    <div className='receive_text_box'>
                        <span className='receive_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>receive msg receive msg receive msg receive msg receive msg receive msg receive msg receive msg receive msg</p>
                    </div>
                </div>
                <div className='send_msg'>
                    <div className='send_text_box'>
                        <span className='send_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <Images className="send_msg_img" src="assets/images/profile_avatar.png"/>
                    </div>
                </div>
                <div className='receive_msg'>
                    <div className='receive_text_box'>
                        <span className='receive_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>receive msg</p>
                    </div>
                </div> 
                <div className='send_msg'>
                    <div className='send_text_box'>
                        <span className='send_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg send msg</p>
                    </div>
                </div>
                <div className='receive_msg'>
                    <div className='receive_text_box'>
                        <span className='receive_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>receive msg receive msg receive msg receive msg receive msg receive msg receive msg receive msg receive msg</p>
                    </div>
                </div>
                <div className='send_msg'>
                    <div className='send_text_box'>
                        <span className='send_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>send msg</p>
                    </div>
                </div>
                <div className='receive_msg'>
                    <div className='receive_text_box'>
                        <span className='receive_msg_action'>
                            <BsThreeDotsVertical/>
                        </span>
                        <p>receive msg</p>
                    </div>
                </div> 
            </div>
            <div className='box_footer'>
                <div className='voice_box'>
                </div>
                <div className='media_box'>
                    <input onChange={(e)=>setMsg(e.target.value)} value={msg} className='input_box'/>
                </div>
                <div className='send_btn'>
                    {msg != "" 
                      ?
                      <div onClick={handleSendMsg} className='send_icon'>
                          <RiSendPlane2Fill/>
                      </div>
                      :
                      <div className='like_icon'>
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