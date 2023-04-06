import React, { useEffect,useState } from 'react'
import "./user.css"
import { useSelector,useDispatch } from 'react-redux';
import { getDatabase, ref, onValue, set, push,remove} from "firebase/database";
import Images from '../../components/Images';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../../components/Title';

const SuggestUser = () => {
    let data = useSelector(state => state)
    let [userlist,setUserlist] = useState([])
    let db = getDatabase()

    let [load,setLoad] = useState(false)
    let [frequest,setfreqest] = useState([])


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

    let handleFriendRequest = (info) =>{
        set(ref(db, 'friendrequest/'+info.id), {
            sendername: data.userData.userInfo.displayName,
            senderid: data.userData.userInfo.uid,
            receivername: info.displayName,
            receiverid: info.id,
          }).then(()=>{
            toast("Request Sent Successfully..");
          })
    }
    useEffect(()=>{
        const usersRef = ref(db, 'friendrequest');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if(item.val().senderid == data.userData.userInfo.uid){
                    arr.push(item.val().receiverid + item.val().senderid)
                }
            })
            setfreqest(arr)
        });
    },[])
    let handleCancelRequest = (cancel_info) =>{
        remove(ref(db, 'friendrequest/'+ cancel_info.id)).then(()=>{
            console.log("cancel done")
        }).then(()=>{
            toast("Request Cancel..")
        });  
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
        <Title className="suggest_user_title" title="Suggestions User"/>
        <div className='suggestuser_wrapper'>
            {
                userlist.map(item=>(
                    <div className='suggest_user_item'>
                        <div className='suggest_user'>
                            <div className='img_holder'>
                                <Images/>
                            </div>
                            <div className='suggest_user_info'>
                                <h2>{item.displayName}</h2>
                                <p>{item.email}</p>
                            </div>
                        </div>
                        {
                            frequest.includes(item.id + data.userData.userInfo.uid || data.userData.userInfo.uid + item.id)
                            ?
                            <button onClick={()=> handleCancelRequest(item)} className='add_btn'>Cancel</button>
                            :
                            <button onClick={()=> handleFriendRequest(item)} className='add_btn'>Add</button>
                        }
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default SuggestUser