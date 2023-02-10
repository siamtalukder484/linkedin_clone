import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom"
import Login from "./pages/login/Index";
import Registration from './pages/registration/Index';
import firebaseConfig from "./configuration/firebaseConfig"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Index"


const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
    </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
