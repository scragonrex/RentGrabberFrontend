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
   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </>
  ); 
}