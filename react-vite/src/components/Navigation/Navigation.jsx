import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  // for design purposes, manually setting sessionUser
  sessionUser = true

  return (
    <div className="navbar">
        <div onClick={goHome}className="logo">HeapLeak</div>
        <div className="search">
            <Link>About</Link>
            <input type="search" placeholder="search" />
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
        (                    <div id= 'profile'>
          <ProfileButton user={sessionUser} className='profile-button' />
      </div>)}
    </div>
  );
}

export default Navigation;
