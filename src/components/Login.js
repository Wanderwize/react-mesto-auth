import Header from "./Header.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth";

function Login({
  handleLogin,
  setSuccessRegister,
  infoTooltipOpenPopup,
  handleLoader,
}) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          handleLogin();
          handleLoader();
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        setSuccessRegister(false);
        infoTooltipOpenPopup();
      });
  };

  return (
    <div>
      <div className="login">
        <form onSubmit={handleSubmit} className="login__form">
          <h2 className="login__title">Вход</h2>
          <input
            required
            value={formValue.email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="Email"
            className="login__input"
            type="email"
            autoComplete="on"
          />
          <input
            required
            id="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Пароль"
            className="login__input"
            type="password"
            autoComplete="on"
          />
          <button
            type="submit"
            style={{ marginBottom: "112px" }}
            className="login__button"
          >
            Войти
          </button>
          <div className="login__flex"></div>
        </form>
      </div>
    </div>
  );
}

export default Login;
