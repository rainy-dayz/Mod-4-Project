import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import { thunkGetCurrentBookings } from "../../store/bookings";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory()

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
          <p className="errors">{errors.credential}</p>
        )}
        <button className="login-btn" type="submit" onClick={() => history.push('/')} disabled={disable}>Log In</button>
      </form>
        <button className="demo-user" onClick={() => {
          // setErrors({});
          return dispatch(sessionActions.login({ credential:'FakeUser1', password:'password' }))
          .then(()=>history.push('/'))
          .then(closeModal)
          // .then(dispatch(thunkGetCurrentBookings()))

        }} >Demo User</button>
        <button className="demo-user" onClick={() => {
          // setErrors({});
          return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
          .then(()=>history.push('/'))
          .then(closeModal)
          // .then(dispatch(thunkGetCurrentBookings()))

        }} >Demo User 2</button>
    </div>
  );
}

export default LoginFormModal;
