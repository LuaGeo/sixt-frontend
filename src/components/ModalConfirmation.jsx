// Modal that appears when form in PersonnalDetails's page is submit, showing the reference code reservation created and sent by the backend, and then, navigation to Home's page when closed

import { useNavigate } from "react-router-dom";

export const ModalConfirmation = ({
  setVisibleModalConfirmation,
  visibleModalConfirmation,
  reservationReference,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="modalConfirmationContainer"
      onClick={() => {
        setVisibleModalConfirmation(!visibleModalConfirmation);
        navigate("/");
      }}
    >
      <div
        className="infosConfirmationContainer"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div>
          <button
            onClick={() => {
              setVisibleModalConfirmation(!visibleModalConfirmation);
              navigate("/");
            }}
          >
            X
          </button>
        </div>
        <p style={{ fontWeight: "bold" }}>RÉSERVATION CONFIRMÉE</p>
        <div>
          <p>Voici la référence de votre dossier :</p>
          <p>{reservationReference}</p>
        </div>
      </div>
    </div>
  );
};
