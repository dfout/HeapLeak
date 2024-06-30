import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div class="navbar">
        <div class="logo">HeapLeak</div>
        <div class="search">
            <p>About</p>
            <input type="search" placeholder="search" />
        </div>
        <div class="login">
            <button type="submit">Login</button>
            <div class="signup">
                <button type="submit">Sign Up</button>
            </div>
        </div>
    </div>
  );
}

export default Navigation;
