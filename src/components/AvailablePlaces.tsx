import React, { useEffect, useState } from "react";
import Places from "./Places.tsx";
import { GET_PLACES_API } from "../config";

type Props = {
  handleOnSelect: (id: string) => void;
};

const AvailablePlaces: React.FC<Props> = ({ handleOnSelect }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    void (async () => {
      setPending(true);
      try {
        const response = await fetch(GET_PLACES_API);

        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error: any) {
        console.error(error);
      } finally {
        setPending(false);
      }
    })();
  }, []);

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
