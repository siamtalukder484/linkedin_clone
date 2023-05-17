import React, { useEffect } from 'react'
import "./message.css"
import {RxCross2} from "react-icons/rx"
import {BiMinus} from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { activeUser } from '../../slices/activeChatSlice'

const Message = () => {
    let data = useSelector((state)=>state.activeChatUser.activeUser)
    let dispatch = useDispatch();
let [minimize, setMinimize] = useState(false)
let [boxexit, setBoxexit] = useState(false)

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
                    <input className='input_box'/>
                </div>
                <div className='send_btn'>
                    <button>Send</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Message