import React from 'react';
import './Header.css';
import logo from "../../assets/netflixlogo.png";
import icon from "../../assets/user.png"
export default function Header({ black }) {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src={logo} alt="Netflix" />
        </a>
      </div>
      <div className="header--user">
        <img src={icon} alt="Usuário" />
      </div>
    </header>
  );
}