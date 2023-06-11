import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { Header } from "../components/Header";
import { BackofficeModal } from "../components/BackofficeModal";
import { BackofficeTableItem } from "../components/BackofficeTableItem";
import { BackofficeTable } from "../components/BackofficeTable";

export const BackOffice = () => {
  const [password, setPassword] = useState("");
  const [isLogged, setIslogged] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [visibleBackofficeModal, setVisibleBackofficeModal] = useState(false);

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    if (password === "HelloWorld!") {
      Cookies.set("password", password);
      setIslogged(true);
    } else {
      console.log("Wrong password");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://site--sixt-backend--6v4khcscf8qp.code.run/reservations/${id}`
      );
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const passwordByCookie = Cookies.get("password");
    if (passwordByCookie) {
      setIslogged(true);
    }
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `https://site--sixt-backend--6v4khcscf8qp.code.run/reservations`
        );
        setReservations(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffers();
  }, []);

  return isLogged ? (
    <>
      <Header setIslogged={setIslogged} />
      <div className="backOfficeContainer">
        <table>
          <thead>
            <tr>
              Vous avez
              <span> {reservations.length}</span> réservations
              <span
                style={{
                  color: "#ff5f00",
                }}
              >
                !
              </span>
            </tr>
          </thead>
          <tbody>
            <BackofficeTable
              reservations={reservations}
              visibleBackofficeModal={visibleBackofficeModal}
              setVisibleBackofficeModal={setVisibleBackofficeModal}
              handleDelete={handleDelete}
            />
            {visibleBackofficeModal && (
              <div className="backofficeModalContainer">
                <BackofficeModal
                  reservations={reservations}
                  visibleBackofficeModal={visibleBackofficeModal}
                  setVisibleBackofficeModal={setVisibleBackofficeModal}
                />
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <>
      <Header />
      <div className="unloggedBackofficeContainer">
        <h2> 💾 Connexion au BackOffice 💾</h2>
        <form onSubmit={handleSubmitPassword}>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="🔑 Mot de passe"
          />
          <button>SE CONNECTER</button>
        </form>
      </div>
    </>
  );
};
