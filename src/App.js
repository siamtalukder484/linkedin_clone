import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom"
import Login from "./pages/login/Index";
import Registration from './pages/registration/Index';
import firebaseConfig from "./configuration/firebaseConfig"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Index"
import RootLayout from "./pages/layouts/RootLayout";
import Video from "./pages/video/Index";
import Shop from "./pages/shop/Index";
import Group from "./pages/group/Index";
import Profile from "./pages/profile/Index";
import HomeLayout from "./pages/layouts/HomeLayout";
import SuggestUser from "./pages/user/SuggestUser";
import FriendRequest from "./pages/user/FriendRequest";
import Friends from "./pages/user/Friends";
import BlockUser from "./pages/user/BlockUser";


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route element={<RootLayout/>}>
          <Route element={<HomeLayout/>}>
              <Route path="home" element={<Home/>}></Route>
              <Route path="video" element={<Video/>}></Route>
              <Route path="shop" element={<Shop/>}></Route>
              <Route path="group" element={<Group/>}></Route>
              <Route path="suggestuser" element={<SuggestUser/>}></Route>
              <Route path="friendrequest" element={<FriendRequest/>}></Route>
              <Route path="friends" element={<Friends/>}></Route>
              <Route path="block" element={<BlockUser/>}></Route>
          </Route>
              <Route path="profile" element={<Profile/>}></Route>
      </Route>
    </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
