import React, { useEffect, useState } from 'react'
import { getDatabase,ref as dbref, onValue,remove,set, push,update} from "firebase/database";
import { useDispatch,useSelector } from 'react-redux'
import Title from '../../components/Title';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const MyGroup = () => {

  const db = getDatabase();
  let data= useSelector(state => state)
  let [mygrouplist, setMygrouplist] = useState([])

  useEffect(()=>{
    const starCountRef = dbref(db, 'group');
    onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            arr.push({...item.val(),id:item.key})
        })
        setMygrouplist(arr)
    });
  },[])
  console.log(mygrouplist);


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
        <Title className="suggest_user_title" title="My Group"/>
        <div className='suggestuser_wrapper'>
                    <div className='suggest_user_item'>
                        <div className='suggest_user'>
                            <NavLink to="#">
                                <div className='img_holder'>
                                    <h3>S</h3>
                                </div>
                            </NavLink>
                            <div className='suggest_user_info'>
                                <NavLink to="#">
                                    <h2>siam</h2>
                                </NavLink>
                                <p>siam.cit.bd@gmail.com</p>
                            </div>
                        </div>
                          <button className='add_btn friend'>Friend</button>
                    </div>
        </div>
        
    </>
  )
}

export default MyGroup