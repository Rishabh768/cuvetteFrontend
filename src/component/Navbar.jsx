import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import {useAuth} from '../component/AuthProvider'
const Navbar = () => {
  const {user}=useAuth();
  return (
    <nav className='flex justify-between p-6  md:px-10 md:py-8'>
       <Link to='/'><img src={logo} alt="cuvette"/> </Link>
        <ul className='flex gap-5'>
          <li><Link to='#'>Contact</Link></li>
          <li>{!user
            &&
            <Link to='/signin'>Sign in</Link>
            }
            </li>
        </ul>
       
    </nav>
  )
}

export default Navbar