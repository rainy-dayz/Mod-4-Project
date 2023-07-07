import React from 'react';
import { NavLink,Link,useHistory  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  return (
    <>
    <ul className="boxes">
      <div className='logo-box' onClick={() => { history.push(`/`)}}>
      <img className = "logo" src="https://www.petticoatparlor.com/prodimages/adventureland%20with%20coaster.jpg"/>
      </div>
      <div className="right-corner">
      {sessionUser ?<div ><Link id="create-spot" to = '/spots/new'>Create a New Spot</Link></div> : null}
      <div>
      {/* <li className="list-box">
        <NavLink exact to="/">Home</NavLink>
      </li> */}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />

        </div>
      )}
      </div>
      </div>
    </ul>
    </>
  );
}

export default Navigation;
