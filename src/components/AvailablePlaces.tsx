import React, { useEffect, useState } from "react";
import Places from "./Places.tsx";
import { GET_PLACES_API } from "../config";

type Props = {
  handleOnSelect: (id: string) => void;
};

const AvailablePlaces: React.FC<Props> = ({ handleOnSelect }) => {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    fetch(GET_PLACES_API)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      })
      .catch((err) => console.error(err));
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
