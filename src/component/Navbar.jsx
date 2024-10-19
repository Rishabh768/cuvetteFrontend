import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import {useAuth} from '../component/AuthProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {user,setUser}=useAuth();
  const navigate=useNavigate();

  const logout=()=>{
    Cookies.remove('x-token');
    setUser(null);
    navigate('/');
  }
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
            {user &&
              <li><button onClick={logout}>Logout</button></li>
            }
        </ul>
    </nav>
    
  )
}

export default Navbar