import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { FaVideo } from 'react-icons/fa'
import './header.css'
import { logout } from '../../actions/auth.action';

/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


  return(
    <header className="header">
        <div style={{display: "fixed" }}>
            {
              !auth.authenticated ? 
              <ul className="leftMenu">
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/signup'}>Sign up</NavLink></li>
              </ul> : null
            }

        </div>
        <div style={{ position:'relative', margin:'1%', marginLeft:'-1050px' ,color: 'black'}} >
          {auth.authenticated ? `${auth.firstName} ${auth.lastName}` : ''}
          
        </div>
        {
          auth.authenticated ? 
          <ul className="menu">
              <li>
                  <Link
                  style={{ backgroundColor: '##EDEDED',border:'none', padding:'12px 15px 15px 15px ', boxShadow: '2px 2px 1px #18619d', borderRadius:' 10px'}}
                   to={'#'} onClick={() => {dispatch(logout(auth.uid))}}>Logout</Link>
              </li>
              <div>
                <button onClick={()=>{window.location.replace('/webcam')}} style={{ border:'none',position:'fixed', marginTop:'-5px', marginLeft:'-200px '}}>
              <FaVideo/>
                </button> 
            </div>
          </ul> : null
        }
    </header>
   )

 }

export default Header