import { GET_PLACES_API } from "./config";

export async function fetchAvailablePLaces() {
  const response = await fetch(GET_PLACES_API);
  const resData = await response.json();

  if (!response.ok) {
    // set Error message
    throw new Error("Failed to fetch places.");
  }

  return resData.places;
}
