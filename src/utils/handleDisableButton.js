// Function created to disable the button in LocationSearch's component if any of the fields on the search bar is not filled, or if data's field has an invalid input, like past dates or return's date before than pickup's date

import { differenceInDays } from "date-fns";

export function handleDisableButton(
  pickupStation,
  returnStation,
  pickupDate,
  returnDate
) {
  const currentDate = new Date();
  const isPickupDateValid =
    pickupDate && differenceInDays(new Date(pickupDate), currentDate) >= 0;
  const isReturnDateValid =
    returnDate && differenceInDays(new Date(returnDate), currentDate) >= 0;
  const isReturnDateGreaterThanPickup =
    pickupDate &&
    returnDate &&
    differenceInDays(new Date(returnDate), new Date(pickupDate)) >= 0;

  return (
    !pickupStation ||
    !returnStation ||
    !isPickupDateValid ||
    !isReturnDateValid ||
    !isReturnDateGreaterThanPickup
  );
}
