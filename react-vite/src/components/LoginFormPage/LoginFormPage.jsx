import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [block, setBlock] = useState(false)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let errObj = {}

    //comparison regex : [any char, num, symbol] + @[any char or num] + .[any char or num]
    //ex: demo@aa.io would match, as would demo@aa.i, but demo@aa. would not match, nor would demo@aa and so on


    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (
      email.length === 0 ||
      email.length > 65 ||
      !email.match(validRegex) ||
      password.length < 6
    ) {
      setBlock(true);
    } else {
      setBlock(false);
    }

    if (email.length === 0) errObj.email = "Please provide a valid Email";
    if (email.length > 65) errObj.email = "Email must be 65 characters or less";
    if (!email.match(validRegex)) errObj.email = "Please provide a valid Email";
    if (password.length < 6) errObj.password = "Please provide a password of at least 6 characters";

    setErrors(errObj)
    // console.log(errors)
  }, [email, password]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  async function handleDemoLogin(e){
    e.preventDefault();
    const loginDemo = await dispatch(
      thunkLogin({
        email:'demo@aa.io',
        password:'password',
      })
    );
    if (loginDemo) {
      setErrors(loginDemo);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="login-holder">
      <div className="login-container">
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="login-form">
        <label id="login-col">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label id="login-col">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" disabled={block}>Log In</button>
      </form>
      <button id='demo-button'onClick={e => handleDemoLogin(e)}>Login Demo User</button>
    </div>
    </div>
  );
}

export default LoginFormPage;
