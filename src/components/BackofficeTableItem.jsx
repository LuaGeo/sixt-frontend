import { format, parseISO } from "date-fns";

export const BackofficeTableItem = ({
  reservation,
  visibleBackofficeModal,
  setVisibleBackofficeModal,
}) => {
  return (
    <tr key={reservation._id}>
      <div
        onClick={() => {
          setVisibleBackofficeModal(!visibleBackofficeModal);
        }}
      >
        <td style={{ color: "#ff5f00", fontWeight: "bold" }}>
          {format(parseISO(reservation.reservationDate), "dd/MM/yyyy")}
        </td>
        <td>{reservation.reference}</td>
        <td style={{ fontWeight: "bold" }}>
          {reservation.vehicleDetails.vehicleType}
        </td>
        <td>
          {format(parseISO(reservation.startDate), "dd/MM/yyyy")} -{" "}
          {format(parseISO(reservation.endDate), "dd/MM/yyyy")}
        </td>
        <td style={{ fontWeight: "bold" }}>
          {reservation.clientDetails.lastName.toUpperCase()}{" "}
          {reservation.clientDetails.firstName.charAt(0).toUpperCase()}
          {reservation.clientDetails.firstName.slice(1).toLowerCase()}
        </td>
        <td style={{ fontWeight: "bold" }}>{reservation.totalCost} €</td>
      </div>
    </tr>
  );
};
