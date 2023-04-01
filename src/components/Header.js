import logo from "../images/Vectorlogotip.svg";
import { Link, useNavigate } from "react-router-dom";
import { authorize, getContent, getEmail } from "../auth.js";

function Header(props) {
  const history = useNavigate();
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/login");
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="" />
      </div>

      {props.loggedIn ? (
        <div className="header__flex">
          <h1 className="header__auth-login">{props.headerEmail}</h1>
          <a href="" onClick={signOut} className="header__auth-exit">
            Выйти
          </a>
        </div>
      ) : (
        <a className="header__auth" href="/sign-up">
          Регистрация
        </a>
      )}
    </header>
  );
}

export default Header;
