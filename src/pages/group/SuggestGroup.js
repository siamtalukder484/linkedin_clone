import React, { useEffect, useState } from 'react'
import { getDatabase,ref as dbref, onValue,remove,set, push,update} from "firebase/database";
import { useDispatch,useSelector } from 'react-redux'
import Title from '../../components/Title';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const SuggestGroup = () => {

    const db = getDatabase();
    let data= useSelector(state => state)
    let [suggestgrouplist, setSuggestgrouplist] = useState([])

    useEffect(()=>{
        const starCountRef = dbref(db, 'group');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().whocreateid != data.userData.userInfo.uid){
                    arr.push({...item.val(),groupid:item.key})
                }
            })
            setSuggestgrouplist(arr)
        });
      },[])

      let handleJoinGroup = (item) => {
        set(push(dbref(db, 'grouprequest')), {
            groupid: item.groupid,
            groupname: item.groupname,
            grouptitle: item.grouptitle,
            whojoinid: data.userData.userInfo.uid,
            whojoinname: data.userData.userInfo.displayName,
            whojoinemail: data.userData.userInfo.email,
            adminid: item.whocreateid,
            adminname: item.whocreatename,
            date: item.date,
        })
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
        <Title className="suggest_user_title" title="Suggest Group"/>
        <div className='suggestuser_wrapper'>
            {suggestgrouplist.map(item=>(
                <div className='suggest_user_item'>
                    <div className='suggest_user'>
                        <NavLink to="#">
                            <div className='img_holder'>
                                <h3>{item.groupname[0]}</h3>
                            </div>
                        </NavLink>
                        <div className='suggest_user_info'>
                            <NavLink to="#">
                                <h2>{item.groupname}</h2>
                            </NavLink>
                            <p>{item.grouptitle}</p>
                        </div>
                    </div>
                        <button onClick={()=>handleJoinGroup(item)} className='add_btn friend'>Join</button>
                </div>
            ))
            }
        </div>
        
    </>
  )
}

export default SuggestGroup