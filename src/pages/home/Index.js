import React, { useEffect,useState } from 'react'
import {signOut, onAuthStateChanged, getAuth, updateProfile} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';

const Index = () => {

  let data= useSelector(state => state)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();

  useEffect(()=>{
    if(!data.userData.userInfo){
      console.log("ki ki")
      navigate("/")
    }
  },[])

    onAuthStateChanged (auth,(user)=>{
      if(user){
        console.log(user);
      }else{
        navigate("/")
      }
    })
  let handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo")
      dispatch(activeUser(null))
      navigate("/")
    }).catch((error) => {
      // An error happened.
    });
    
  }
  return (
    <>
      <h1>This is home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Index