import React from 'react'
import "./user.css"
import Images from '../../components/Images'
import Title from '../../components/Title'

const BlockUser = () => {
  return (
    <>
    <Title className="suggest_user_title" title="Block User"/>
     <div className='suggestuser_wrapper'>
        <div className='suggest_user_item'>
            <div className='suggest_user'>
                <div className='img_holder'>
                    <Images/>
                </div>
                <div className='suggest_user_info'>
                    <h2>test user</h2>
                    <p>test@gmail.com</p>
                </div>
            </div>
            <div className='f_req_btn_wrapper'>
                <button className='add_btn'>Message</button>
                <button className='add_btn'>UnBlock</button>
            </div>
        </div>
     </div>
    </>
  )
}

export default BlockUser