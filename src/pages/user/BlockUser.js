import React,{useEffect,useState} from 'react'
import "./user.css"
import Images from '../../components/Images'
import Title from '../../components/Title'
import { getDatabase, ref, onValue,remove,set, push} from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

const BlockUser = () => {
    let data = useSelector(state => state)
    const db = getDatabase();
    let [blocklist, setblocklist] = useState([]);


    useEffect(() => {
        const starCountRef = ref(db, "block");
        onValue(starCountRef, (snapshot) => {
          let arr = [];
          snapshot.forEach((item) => {
            if (item.val().blockbyid == data.userData.userInfo.uid) {
              arr.push({
                id: item.key,
                block: item.val().block,
                blockid: item.val().blockid,
              });
            } 
          });
          setblocklist(arr);
        });
      }, []);

  return (
    <>
    <Title className="suggest_user_title" title="Block User"/>
     <div className='suggestuser_wrapper'>
        {
        blocklist.length > 0
        ?
        blocklist.map(item=>(
            <div className='suggest_user_item'>
                <div className='suggest_user'>
                    <div className='img_holder'>
                        <Images/>
                    </div>
                    <div className='suggest_user_info'>
                        <h2>{item.block}</h2>
                        <p>test@gmail.com</p>
                    </div>
                </div>
                <div className='f_req_btn_wrapper'>
                    <button className='add_btn delete'>Delete</button>
                    <button className='add_btn'>Unblock</button>
                </div>
            </div>
        ))
        :
        <Alert variant="filled" severity="error">
            No block user available..
        </Alert>
        }
     </div>
    </>
  )
}

export default BlockUser