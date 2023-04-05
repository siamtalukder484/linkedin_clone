import React, { useEffect,useState } from 'react'
import "./user.css"
import { useSelector,useDispatch } from 'react-redux';
import { getDatabase, ref, onValue, set, push,remove} from "firebase/database";
import Images from '../../components/Images';

const SuggestUser = () => {
    let data= useSelector(state => state)
    let [userlist,setUserlist] = useState([])
    let db = getDatabase()


    useEffect(()=>{
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(data.userData.userInfo.uid != item.key){
                    arr.push({
                        ...item.val(), 
                        id:item.key,
                    })
                }
            })
            setUserlist(arr)
        });
    },[])

  return (
    <>
        <div className='suggestuser_wrapper'>
            <div className='suggest_user'>
                <div className='img_holder'>
                    <Images/>
                </div>
            </div>
        </div>
        {/* {
        userlist.map(item=>(
            <div>{item.displayName}</div>
        ))

        } */}
    </>
  )
}

export default SuggestUser