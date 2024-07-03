import {  useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";



function Navigation() {
  let sessionUser = useSelector(state => state.session.user)
  const navigate = useNavigate()

  const goToLogin = ()=>{
    navigate('/login')
  }

  const goHome = () => {
    navigate('/')
  }
  const goToSignup = () => {
    navigate('/signup')
  }




  return (
    <div className="navbar">
        <div className="logoDiv">
          <img src="https://drive.google.com/thumbnail?id=1nD3JcAqqznDaTvWaRYqDRFD3PUIcKW9V" alt="HeapLeak Logo" id="logoPhoto" onClick={()=> goHome()}/>
        </div>
        <div className="search">
            {/* <Link to='/about'>About</Link> */}
            <input type="search" placeholder="search" onClick={() => alert('Search feature coming soon!')}/>
        </div>
        {!sessionUser &&
                (<div className="login">
                <button onClick={goToLogin}>Login</button>
                <div className="signup">
                    <button onClick={goToSignup}>Sign Up</button>
                </div>
            </div>)

        }
        {sessionUser &&
        (
          <>
          <NavLink to='/saved-questions'>Saved Questions</NavLink>
            <Link to='questions/create'>Ask a Question</Link>
          <div id= 'profile'>
          <ProfileButton user={sessionUser} className='profile-button' />
          </div>
          </>
        )}
    </div>
  );
}

export default Navigation;
