// Function called in components and pages as Modal.jsx, RentOfferCardItem.jsx, OfferConfig.jsx, using the date-js package to compare dates and calculate the number of days of the rent (rentalDurationInDays)

// Then calculate the total price with included extra fees and additional options using reduce function to sum all the values in the arrays

import { differenceInDays } from "date-fns";

export function calculateTotalPrice({
  returnDate,
  pickupDate,
  offer,
  additionalChargePrices,
  extraFees,
}) {
  const rentalDurationInDays = differenceInDays(
    new Date(returnDate),
    new Date(pickupDate)
  );

  let totalPrice = offer.prices.dayPrice.amount * rentalDurationInDays;

  if (additionalChargePrices) {
    totalPrice += additionalChargePrices.reduce((acc, value) => {
      return acc + value * rentalDurationInDays;
    }, 0);
  }

  if (extraFees) {
    totalPrice += extraFees.reduce((acc, value) => {
      return acc + value;
    }, 0);
  }

  return totalPrice.toFixed(2);
}
