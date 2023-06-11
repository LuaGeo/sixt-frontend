// Component Header called in all the pages that includes a switch function which only modifies the navigation between the 2 elements at the ends of each page and makes the Logout button disappears if not connected

import logo from "../assets/imgs/sixt-logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

export const Header = ({ currentPage }) => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const navigate = useNavigate();

  const renderHeaderContent = () => {
    switch (currentPage) {
      case "Home":
        return (
          <nav>
            <ul>
              <li
                style={{
                  color: "#ff5f00",
                  textDecoration: "underline",
                }}
              >
                RENT
              </li>
              <li>SHARE</li>
              <li>RIDE</li>
              <li>SIXT+ abonnement auto</li>
            </ul>
          </nav>
        );
      case "OfferList":
        return (
          <nav>
            <ul>
              <li style={{ color: "#ff5f00" }}>
                <div className="orangeCircle">
                  <p>1</p>
                </div>
                SÉLECTION DES VÉHICULES
              </li>
              <li style={{ color: "#ccc" }}>
                <div className="grayCircle">
                  <p>2</p>
                </div>
                PROTECTIONS ET OPTIONS
              </li>
              <li style={{ color: "#ccc" }}>
                <div className="grayCircle">
                  <p>3</p>
                </div>
                CONDUCTEUR
              </li>
            </ul>
          </nav>
        );
      case "OfferConfig":
        return (
          <nav>
            <ul>
              <li style={{ color: "#ff5f00" }}>
                <div className="orangeCircle">
                  <p className="ico-bullet-xl"></p>
                </div>
                SÉLECTION DES VÉHICULES
              </li>
              <li style={{ color: "#ff5f00" }}>
                <div className="orangeCircle">
                  <p>2</p>
                </div>
                PROTECTIONS ET OPTIONS
              </li>
              <li style={{ color: "#ccc" }}>
                <div className="grayCircle">
                  <p>3</p>
                </div>
                CONDUCTEUR
              </li>
            </ul>
          </nav>
        );
      case "PersonnalDetails":
        return (
          <nav>
            <ul>
              <li style={{ color: "#ff5f00" }}>
                <div className="orangeCircle">
                  <p className="ico-bullet-xl"></p>
                </div>
                SÉLECTION DES VÉHICULES
              </li>
              <li style={{ color: "#ff5f00" }}>
                <div className="orangeCircle">
                  <p className="ico-bullet-xl"></p>
                </div>
                PROTECTIONS ET OPTIONS
              </li>
              <li style={{ color: "#ff5f00" }}>
                <div className="orangeCircle">
                  <p>3</p>
                </div>
                CONDUCTEUR
              </li>
            </ul>
          </nav>
        );

      default:
        return null;
    }
  };

  const passwordByCookie = Cookies.get("password");

  const passwordRemove = () => {
    setIsDisconnecting(true);
    Cookies.remove("password");
    setIsDisconnecting(false);
    window.location.reload(false);
  };

  return (
    <header className="headerHome">
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="Sixt logo" className="logoHeader" />
        </button>
        {renderHeaderContent()}
      </div>

      <div>
        {passwordByCookie && !isDisconnecting && (
          <div>
            <button className="loggoutButton" onClick={passwordRemove}>
              SE DÉCONNECTER
            </button>
          </div>
        )}
        <Link
          to={"/backoffice"}
          style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
        >
          <span className="ico-planet">BACKOFFICE</span>
        </Link>
      </div>
    </header>
  );
};
