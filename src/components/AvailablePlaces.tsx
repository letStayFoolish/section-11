import React, { useEffect, useState } from "react";
import Places from "./Places.tsx";
import { GET_PLACES_API } from "../config";

type Props = {
  handleOnSelect: (id: string) => void;
};

const AvailablePlaces: React.FC<Props> = ({ handleOnSelect }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(GET_PLACES_API);

        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error: any) {
        console.error(error);
      }
    })();
  }, []);

  console.log({ availablePlaces });

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      onSelectPlace={handleOnSelect}
      fallbackText={"Sorting places by distance..."}
    />
  );
};

export default AvailablePlaces;
