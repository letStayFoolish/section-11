import React, { useEffect, useState } from "react";
import Places from "./Places.tsx";
import { GET_PLACES_API } from "../config";
import ErrorPage from "./Error.tsx";
import { sortPlacesByDistance } from "../loc.ts";
import { PlaceType } from "../types";

type Props = {
  handleOnSelect: (id: string) => void;
};

const AvailablePlaces: React.FC<Props> = ({ handleOnSelect }) => {
  const [availablePlaces, setAvailablePlaces] = useState<PlaceType[]>([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState({ message: "" });

  useEffect(() => {
    void (async () => {
      setPending(true);
      setError({ message: "" });
      try {
        const response = await fetch(GET_PLACES_API);
        const resData = await response.json();

        if (!response.ok) {
          // set Error message
          throw new Error("Failed to fetch places.");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            latitude,
            longitude,
          );

          console.log({ sortedPlaces });

          setAvailablePlaces(sortedPlaces);
        });
      } catch (error: any) {
        setError(error || error.message);
        console.error(error);
      } finally {
        setPending(false);
      }
    })();
  }, []);

  if (error.message) {
    return (
      <ErrorPage
        title="An Error occured"
        message={error?.message || "Something went wrong"}
        onConfirm={() => {}}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      onSelectPlace={handleOnSelect}
      fallbackText={"Sorting places by distance..."}
      isLoading={pending}
      loadingText={"Loading available places..."}
    />
  );
};

export default AvailablePlaces;
