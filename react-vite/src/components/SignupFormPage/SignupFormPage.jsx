import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [block, setBlock] = useState(false);

  useEffect(() => {
    let errObj = {}

    //comparison regex : [any char, num, symbol] + @[any char or num] + .[any char or num]
    //ex: demo@aa.io would match, as would demo@aa.i, but demo@aa. would not match, nor would demo@aa and so on


    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (
      email.length === 0 ||
      email.length > 65 ||
      !email.match(validRegex) ||
      username.length < 4 ||
      username.length > 30 ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      setBlock(true);
    } else {
      setBlock(false);
    }

    if (email.length === 0) errObj.email = "Please provide a valid Email";
    if (!email.match(validRegex)) errObj.email = "Please provide a valid Email";
    if (email.length > 65) errObj.email = "Email must be 65 characters or less";
    if (username.length < 4) errObj.username = "Please provide a Username of at least 4 characters";
    if (username.length > 30) errObj.username = "Username must be 30 characters or less";
    if (password.length < 6) errObj.password = "Please provide a password of at least 6 characters";
    if (password !== confirmPassword) errObj.confirmPassword = "Please ensure both passwords match";

    setErrors(errObj)
    // console.log(errors)
  }, [email, username, password, confirmPassword]);


  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };





  return (
    <div className="sign-up-holder">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label id='login-col'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label id='login-col'>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label id='login-col'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label id='login-col'>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button id = "login-button" type="submit" disabled ={block}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
