import { PLACES_API, USER_PLACES_API } from "./config";
import { PlaceType } from "./types";

export async function fetchAvailablePLaces() {
  const response = await fetch(PLACES_API);
  const resData = await response.json();

  if (!response.ok) {
    // set Error message
    throw new Error("Failed to fetch places.");
  }

  return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch(USER_PLACES_API);

  const resData = await response.json();

  if (!response.ok) {
    // set Error message
    throw new Error("Failed to fetch user's places.");
  }

  return resData.places;
}

export async function updateUsersPlaces(places: PlaceType[]) {
  const response = await fetch(USER_PLACES_API, {
    method: "PUT",
    body: JSON.stringify({ places }), // JS arrays aren't formattable, so that is why we have to format it as a JSON and send JSON data within the body.
    headers: {
      "Content-Type": "application/json", // meta data - inform the backend that data attached to this request will be formatted as JSON
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    // set Error message
    throw new Error("Failed to update user's places.");
  }

  return resData.message;
}
