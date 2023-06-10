import { Link } from "react-router-dom";
import { BackofficeTableItem } from "./BackofficeTableItem";

export const BackofficeTable = ({
  reservations,
  visibleBackofficeModal,
  setVisibleBackofficeModal,
  handleDelete,
}) => {
  return (
    <>
      {reservations.map((reservation) => (
        <div className="tableItem" key={reservation._id}>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            onClick={() => {
              setVisibleBackofficeModal(!visibleBackofficeModal);
            }}
            state={{ reservation }}
          >
            <BackofficeTableItem
              reservation={reservation}
              visibleBackofficeModal={visibleBackofficeModal}
              setVisibleBackofficeModal={setVisibleBackofficeModal}
            />
          </Link>
          <button
            className="ico-close"
            onClick={() => handleDelete(reservation._id)}
          ></button>
        </div>
      ))}
    </>
  );
};
