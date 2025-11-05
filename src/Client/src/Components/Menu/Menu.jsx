import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";

function MenuComponent({ menuStatus }) {
  const location = useLocation();
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(!!menuStatus);
  const [stateClass, setStateClass] = useState(menuStatus ? "open" : "closed");

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (menuStatus) {
      setVisible(true);
      requestAnimationFrame(() => setStateClass("open"));
    } else {
      if (visible) {
        setStateClass("closing");
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
          setStateClass("closed");
        }, 320);
      } else {
        setStateClass("closed");
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [menuStatus]);

  function handleAnimationEnd() {
    if (stateClass === "closing") {
      setVisible(false);
      setStateClass("closed");
    }
  }

  function closeNavButton(currentPage) {
    return location.pathname === currentPage ? "closed" : "";
  }

  return (
    <div className="container-menu">
      {visible && (
        <div className={stateClass} onAnimationEnd={handleAnimationEnd}>
          <NavLink to={"/perfil"} className={closeNavButton("/perfil")}>
            Meu perfil
          </NavLink>
          <hr className={closeNavButton("/perfil")} />

          <NavLink
            to={"/meus-projetos"}
            className={closeNavButton("/meus-projetos")}>
            Meus projetos
          </NavLink>
          <hr className={closeNavButton("/meus-projetos")} />

          <NavLink to={"/home"} className={closeNavButton("/home")}>
            Home
          </NavLink>
          <hr className={closeNavButton("/home")} />

          <NavLink to={"/login"} className={""}>
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default MenuComponent;
