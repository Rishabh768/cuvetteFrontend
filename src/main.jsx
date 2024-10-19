
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Verify from './pages/Verify.jsx'
import Signin from './pages/Signin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './component/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
     <BrowserRouter>
     <AuthProvider>

       <Routes>
        <Route path='/' element={<App/>}>
         <Route path='/' element={<Signup/>}/>
         <Route path='/signin' element={<Signin/>}/>
         <Route path='/verify' element={<Verify/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
       </Routes>
       <ToastContainer/>
     </AuthProvider>
     </BrowserRouter>

)
