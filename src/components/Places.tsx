import React from "react";
import type { PlaceType } from "../types";
import { BASE_URL } from "../config";

type Props = {
  title: string;
  places: PlaceType[];
  fallbackText: string;
  onSelectPlace: (id: string) => void;
};

const Places: React.FC<Props> = ({
  title,
  places,
  fallbackText,
  onSelectPlace,
}) => {
  if (!places) return;

  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place.id)}>
                <img
                  src={`${BASE_URL}/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Places;
