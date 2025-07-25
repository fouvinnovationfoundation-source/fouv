import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Login from "../pages/Login";
import NewHome from "../pages/NewHome";
import ProtectedRoute from "../ProtectedRoute"; 
import Contact from "../pages/Contact";
import Events from "../pages/Events";
import Programs from "../pages/Programs";
import ProgramDetails from "../pages/ProgramDetails";
import Faqs from "../pages/Faqs";
import ResetPassword from "../pages/ResetPassword";

export const routes = [
  { path: '*', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services', element: <Services /> },
  {path:'/events',element:<Events/>},
  {path:'/programs',element:<Programs/>},
  {path:'/programs/:id',element:<ProgramDetails/>},
  {path:'/contact',element:<Contact/>},
  {path:'/faqs',element:<Faqs/>},
  { path: '/login', element: <Login /> },
  {path:'/reset-password/:id',element:<ResetPassword/>},
  { path: '/admin-dashboard',element: (
      <ProtectedRoute>
        <NewHome />
      </ProtectedRoute>
    ),
  },
];
