import React, { useEffect,useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Flex from '../../components/Flex'
import Images from '../../components/Images'
import {AiFillHome} from "react-icons/ai"
import {MdOutlineOndemandVideo} from "react-icons/md"
import {BsShopWindow} from "react-icons/bs"
import {HiUserGroup} from "react-icons/hi"
import {GrGamepad} from "react-icons/gr"
import {CgMenuGridR} from "react-icons/cg"
import {BsMessenger} from "react-icons/bs"
import {IoIosNotifications} from "react-icons/io"
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./layout.css"
import Input from '../../components/Input'

const RootLayout = () => {
    let navigate = useNavigate();
    let data= useSelector(state => state)
    let [topstate, setTopState] = useState(false)
    // console.log(top)

    useEffect(()=>{
        if(!data.userData.userInfo){
          navigate("/")
        }
      },[])
    let handleProfileClick = () =>{
        navigate("profile")
    }
    useEffect(()=>{
        window.addEventListener("scroll",function(){
            const istop = window.scrollY < 150
            if(istop != true){
                setTopState(true)
            }else{
                setTopState(false)
            }
        })
    })
    let handlesidebar = () => {

    }
  return (
    <>  
        <div className='layout_sidebar'>
            <div className='nn'>
                <p>kdfjdksjfksdlf</p>
                <p>kdfjdksjfksdlf</p>
                <p>kdfjdksjfksdlf</p>
                <p>kdfjdksjfksdlf</p>
            </div>
            <div className='mm'>
            <p>kdfjdksjfksdlf</p>
                <p>kdfjdksjfksdlf</p>
                <p>kdfjdksjfksdlf</p>
                <p>kdfjdksjfksdlf</p>
            </div>
        </div>
        <Flex className={topstate ? "layout_main fixed":"layout_main"}>
            <Flex className="nav_logo">
                <Link to="home">
                    <Images src="./assets/images/logo.png"/>
                </Link>
                <Flex className="root_search_holder">
                    <Input type="text" placeholder="Search Here..." className="root_search"/>
                </Flex>
            </Flex>
            <Flex className="nav_menu">
                <NavLink to="home">
                    <AiFillHome/>
                </NavLink>
                <NavLink to="video">
                    <MdOutlineOndemandVideo/>
                </NavLink>
                <NavLink to="shop">
                    <BsShopWindow/>
                </NavLink>
                <NavLink to="group">
                    <HiUserGroup/>
                </NavLink>
            </Flex>
            <Flex className="nav_action">
                <Flex className="nav_action_item">
                    <CgMenuGridR/>
                </Flex>
                <Flex className="nav_action_item">
                    <BsMessenger/>
                </Flex>
                <Flex onClick={handlesidebar} className="nav_action_item">
                    <IoIosNotifications/>
                </Flex>
                <Flex onClick={handleProfileClick} className="nav_action_item">
                {data.userData.userInfo
                    ?
                        data.userData.userInfo.photoURL
                        ?
                        <Images src={data.userData.userInfo.photoURL}/>
                        :
                        <Images src="assets/images/profile_avatar.png"/>    
                    :
                    <Images src="assets/images/profile_avatar.png"/>
                    }
                </Flex>
            </Flex>
        </Flex>
        <Outlet/>
    </>
  )
}

export default RootLayout