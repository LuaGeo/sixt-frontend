import { differenceInDays } from "date-fns";

// using the date-js package to compare dates and calculate the number of days of the rent (rentalDurationInDays)
// calculate the total price with extra fees included using reduce function to sum all the values in extraFees array

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
