import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  let disable=true
  if(credential.length >3 || password.length >5){
    disable =false
  }
  return (
    <div className="loginBtn">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
          className="input-field"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
          className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button className="login-btn" type="submit" disabled={disable}>Log In</button>
      </form>
        <button className="demo-user" onClick={() => {
          // setErrors({});
          return dispatch(sessionActions.login({ credential:'FakeUser1', password:'password2' }))
            .then(closeModal)
            // .catch(async (res) => {
            //   const data = await res.json();
            //   if (data && data.errors) {
            //     setErrors(data.errors);
            //   }
            // });
        }} >Demo User</button>
    </div>
  );
}

export default LoginFormModal;
