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
