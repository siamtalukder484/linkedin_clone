import React, { useEffect,useState } from 'react'
import "./user.css"
import Images from '../../components/Images';
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Title from '../../components/Title';

const Friends = () => {
  let data = useSelector(state => state)
  const db = getDatabase();
  let dispatch = useDispatch();
  let [friends, setfriends] = useState([])

  useEffect(()=>{
    const starCountRef = ref(db, 'friends');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(data.userData.userInfo.uid == item.val().receiverid || data.userData.userInfo.uid == item.val().senderid){
                arr.push({...item.val(),id:item.key})
            } 
        })
        setfriends(arr)
    });
  },[])

  return (
    <>
      <Title className="suggest_user_title" title="Friends"/>
      <div className='suggestuser_wrapper'>
        {
          friends.map(item=>(
          <div className='suggest_user_item'>
              <div className='suggest_user'>
                  <div className='img_holder'>
                      <Images/>
                  </div>
                  <div className='suggest_user_info'>
                        {data.userData.userInfo.uid == item.senderid 
                        ? 
                            <h2>{item.receivername}</h2>
                        :
                            <h2>{item.sendername}</h2>
                        }
                      <p>{item.date}</p>
                  </div>
              </div>
              <div className='f_req_btn_wrapper'>
                  <button className='add_btn'>Message</button>
                  <button className='add_btn delete'>Block</button>
              </div>
          </div>
          ))
        }
      </div>
    </>
  )
}

export default Friends