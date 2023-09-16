import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SProfile from "./pages/SProfile";
import TProfile from "./pages/TProfile";

const router = createBrowserRouter([ 
  { path: "*", Component: Root },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
function Root() {
  // const isAuth = Boolean(useSelector(state=>state.auth.token));
  // const isAuth=true;
  const location = useLocation();
  // const mobileView = useMediaQuery('(max-width:720px)');
  return (
    <>
    <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/student/profile' element={<SProfile/>} />
          <Route path='/teacher/profile' element={<TProfile/>} />
        </Routes>
    </>
  ); 
}