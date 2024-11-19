import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/Router'
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';

const App = () => {

  return (
  // <>

  //   <RouterProvider
  //   future={{
  //   v7_startTransition: true,
  // }} 
  
  // router={router} />
  // </>
  
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
