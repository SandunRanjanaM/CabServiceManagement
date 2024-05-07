import React from 'react';
import "../styles/LayoutStyle.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'


const Layout = ({children}) => {
  const {user}=useSelector (state=>state.user)
  return (
    <>
    <div className='main'>
        <div className='layout'>
            <div className='content'>
                <div className='header'>
                  <div className='header-content'>
                <FontAwesomeIcon icon={faBell} />
                <Link to ="/profile">{user?.name}</Link>
                  </div>
                </div>
                <div className='body'>{children}</div>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Layout;