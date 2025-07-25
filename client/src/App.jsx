import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {routes} from "./routes/Routes"
import "./App.css"
import ScrollToTopButton from './components/ScrollToTopButton'


const router = createBrowserRouter(routes)
function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <ScrollToTopButton/>
      
    </>
  )
}

export default App
