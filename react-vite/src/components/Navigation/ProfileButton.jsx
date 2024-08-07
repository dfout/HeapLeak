import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";

import './ProfileButton.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/');
  };

  return (
    <>
      <button className='profile-button' onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li><Link  className='nav-link-user' to='/manage-questions'>Manage Questions</Link></li>
              <li><Link className = 'nav-link-user' to='/manage-answers'>Manage Answers</Link></li>
              <li><Link  className='nav-link-mobile' to='/saved-questions'>Saved Questions</Link></li>
              <li><Link  className='nav-link-mobile' to='/questions/create'>Ask a Question</Link></li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
