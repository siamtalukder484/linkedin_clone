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


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route element={<RootLayout/>}>
          <Route path="home" element={<Home/>}></Route>
          <Route path="video" element={<Video/>}></Route>
          <Route path="shop" element={<Shop/>}></Route>
          <Route path="group" element={<Group/>}></Route>
      </Route>
      {/* <Route path="/m" element={<RootLayout/>}></Route> */}
    </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
