import React, { useEffect,useState } from 'react'
import "./user.css"
import Images from '../../components/Images';
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    let [frequest, setfreqest] = useState([])
    let data= useSelector(state => state)
    
    useEffect(()=>{
        const starCountRef = ref(db, 'friendrequest');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().receiverid == data.userData.userInfo.uid){
                    arr.push({...item.val(),id:item.key})

                }
            })
            setfreqest(arr)
        });
    },[])


  return (
    <>
    <div className='suggestuser_wrapper'>
        {
            frequest.map(item=>(
                <div className='suggest_user_item'>
                    <div className='suggest_user'>
                        <div className='img_holder'>
                            <Images/>
                        </div>
                        <div className='suggest_user_info'>
                            <h2>{item.sendername}</h2>
                            <p>{item.receiveremail}</p>
                        </div>
                    </div>
                    <div className='f_req_btn_wrapper'>
                        <button className='add_btn'>Confirm</button>
                        <button className='add_btn delete'>Delete</button>
                    </div>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default FriendRequest