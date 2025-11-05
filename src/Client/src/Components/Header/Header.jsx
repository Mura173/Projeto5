import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoLead from "../../assets/logoLEAD.svg";
import LogoLiderancasEmpaticas from "../../assets/logoLE.svg";
import Menu from "../../assets/Menu.png";
import defaultImage from "../../assets/defaultUserImage.svg";

import MenuComponent from "../Menu/Menu.jsx";

function HeaderComponent() {
  const [menuStatus, setMenuStatus] = useState(false);
  const navigate = useNavigate();

  function handleBackButon() {
    navigate("/Home");
  }

  return (
    <>
      <header className="header-component">
        <div className="logo-images">
          <img className="pointer-button" src={logoLead} alt="" onClick={handleBackButon}/>
          <img className="pointer-button" src={LogoLiderancasEmpaticas} alt="" onClick={handleBackButon}/>
        </div>

        <div className="rightNav">
          <img
            src={Menu}
            alt=""
            className="menu pointer-button"
            onClick={() => setMenuStatus((prev) => !prev)}
          />
          <img src={defaultImage} alt="" className="userImage pointer-button" onClick={() => navigate("/perfil")}/>
        </div>
      </header>

      <MenuComponent menuStatus={menuStatus} />
    </>
  );
}

export default HeaderComponent;
