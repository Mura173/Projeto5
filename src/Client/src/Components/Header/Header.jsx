import "./Header.css";
import { useState } from "react";
import logoLead from "../../assets/logoLEAD.svg";
import LogoLiderancasEmpaticas from "../../assets/logoLE.svg";
import Menu from "../../assets/Menu.png";
import defaultImage from "../../assets/defaultUserImage.svg";

import MenuComponent from "../Menu/Menu.jsx";

function HeaderComponent() {
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <>
      <header className="header-component">
        <div className="logo-images">
          <img src={logoLead} alt="" />
          <img src={LogoLiderancasEmpaticas} alt="" />
        </div>

        <div className="rightNav">
          <img
            src={Menu}
            alt=""
            className="menu"
            onClick={() => setMenuStatus((prev) => !prev)}
          />
          <img src={defaultImage} alt="" className="userImage" />
        </div>
      </header>

      <MenuComponent menuStatus={menuStatus} />
    </>
  );
}

export default HeaderComponent;
