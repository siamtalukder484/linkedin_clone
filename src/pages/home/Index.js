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
      navigate("/")
    }
  },[])


  return (
    <>
      {data.userData.userInfo &&
        <>
        <center>
          <h1>This is Home Page</h1>
        </center>
        <h1>Name: {data.userData.userInfo.displayName}</h1>
        <h1>Email: {data.userData.userInfo.email}</h1>
        <h1>Photo: {data.userData.userInfo.photoURL}</h1>
        </>
      
      }
      
      
    </>
  )
}

export default Index