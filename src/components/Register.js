import Header from "./Header.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";

const Register = (props, { setSuccessRegister, setInfoTooltipOpen }) => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    auth.register(email, password).then(
      (res) => {
        props.setSuccessRegister(true);
        props.infoTooltipOpenPopup();
        navigate("/sign-in", { replace: true });
      },
      (err) => {
        props.setSuccessRegister(false);
        props.infoTooltipOpenPopup();
      }
    );
  }

  return (
    <div>
      <div className="login">
        <form onSubmit={handleSubmit} className="login__form">
          <h2 className="login__title">Регистрация</h2>
          <input
            required
            id="email"
            value={formValue.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="login__input"
            type="email"
          />
          <input
            id="password"
            value={formValue.password}
            onChange={handleChange}
            name="password"
            placeholder="Пароль"
            className="login__input"
            type="password"
          />
          <button type="submit" className="login__button">
            Зарегистрироваться
          </button>
          <div className="login__flex">
            <p className="login__enter">
              Уже зарегистрированы?{" "}
              <a className="login__enter" href="/sign-in">
                Войти
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
