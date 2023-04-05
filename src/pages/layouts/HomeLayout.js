import React, { useEffect,useState } from 'react'
import {signOut, onAuthStateChanged, getAuth, updateProfile} from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { activeUser } from '../../slices/userSlices';
import "./layout.css"
import Flex from '../../components/Flex'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  let data= useSelector(state => state)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();

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
        <Flex className="homelayout_main">
            <Flex className="left_sidebar_holder">
                <Flex className="left_sidebar">
                  <Flex className="let_sidebar_nav">
                      <NavLink to="suggestuser">
                        Suggestions User
                      </NavLink>
                  </Flex>
                  <Flex className="logout_btn">
                    <button onClick={handleLogout}>Logout</button>
                  </Flex>
                </Flex>
            </Flex>
            <Flex className="middle_bar_holder">
                <Outlet/>
            </Flex>

            <Flex className="right_sidebar_holder">

            </Flex>
        </Flex>
    </>
  )
}

export default HomeLayout