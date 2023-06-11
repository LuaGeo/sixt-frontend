// Card of additional charges, called in OfferConfig's page

export const AdditionalChargesCard = ({ charge, isActive, onActiveChange }) => {
  return (
    charge && (
      <div
        className={
          isActive ? "selectedChargeCardContainer" : "chargeCardContainer"
        }
        onClick={onActiveChange}
      >
        {charge.icon && <span className={charge.icon}></span>}
        <div>
          {charge.title && <h3>{charge.title.toUpperCase()}</h3>}
          {charge.description && <p>{charge.description}</p>}
          {charge.price?.amount > 0 && (
            <div>
              <p>€</p>
              <h2>{charge.price.amount}</h2>
              <p>jour</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};
