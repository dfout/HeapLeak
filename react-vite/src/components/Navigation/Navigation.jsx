import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormPage from "../LoginFormPage/LoginFormPage";


function Navigation() {
  const sessionUser = useSelector(state => state.session.user)
  const navigate = useNavigate()

  const handleLogin = ()=>{
    navigate('/login')
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className="navbar">
        <div onClick={goHome}className="logo">HeapLeak</div>
        <div className="search">
            <p>About</p>
            <input type="search" placeholder="search" />
        </div>
        {!sessionUser && 
                (<div className="login">
                <button onClick={handleLogin}>Login</button>
                <div className="signup">
                    <button type="submit">Sign Up</button>
                </div>
            </div>)
        
        }
        {sessionUser && 
        (                    <li id= 'profile'>
          <ProfileButton user={sessionUser} className='profile-button' />
      </li>)}
    </div>
  );
}

export default Navigation;
