import React from 'react'
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
import "./layout.css"

const RootLayout = () => {
  return (
    <>
        <Flex className="layout_main">
            <Flex className="nav_logo">
                <Link to="home">
                    <Images src="./assets/images/logo.png"/>
                </Link>
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
                <Flex className="nav_action_item">
                    <IoIosNotifications/>
                </Flex>
                <Flex className="nav_action_item">
                    <Images src="./assets/images/profile_avatar.png"/>
                </Flex>
            </Flex>
        </Flex>
        <Outlet/>
    </>
  )
}

export default RootLayout