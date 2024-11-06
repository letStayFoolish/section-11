import { useEffect, useRef, useState } from "react";
import logoImg from "./assets/logo.png";
import { AVAILABLE_PLACES } from "./data.ts";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import Places from "./components/Places.tsx";
import { ModalRef, PlaceType } from "./types";
import { sortPlacesByDistance } from "./loc.ts";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces"));
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id),
);

function App() {
  const modalRef = useRef<ModalRef>(null);
  const selectedPlaceRef = useRef<string>(null);
  const [availableStates, setAvailableStates] = useState<PlaceType[]>([]);

  const [pickedPlaces, setPickedPlaces] = useState<PlaceType[]>(storedPlaces);

  // An example of redundant useEffect - useEffect not needed
  // useEffect(() => {
  //   const storedIds = JSON.parse(localStorage.getItem("selectedPlaces"));
  //
  //   if (!storedIds) return;
  //
  //   const storedPlaces = storedIds.map((id) =>
  //     AVAILABLE_PLACES.find((place) => place.id === id),
  //   );
  //   setPickedPlaces(storedPlaces);
  // }, []);

  /**
   * useEffect:
   *
   * code inside useEffect will be executed only after the function component execution.
   * */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude,
      );

      setAvailableStates(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id: string) {
    modalRef?.current?.open();
    selectedPlaceRef.current = id;
  }

  function handleStopRemovePlace() {
    modalRef?.current?.close();
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);

      if (place) {
        return [place, ...prevPickedPlaces];
      }
      return prevPickedPlaces;
    });

    // Another example of an a side effect code:
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    // storedIds.indexOf(id) === -1 means that this id is not stored in storedIds
    // need localStorage functionality to persist places picked by the user...
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds]),
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlaceRef.current),
    );
    modalRef?.current?.close();

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlaceRef.current)),
    );
  }

  return (
    <>
      <Modal ref={modalRef}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availableStates}
          onSelectPlace={handleSelectPlace}
          fallbackText={"Sorting places by distance..."}
        />
      </main>
    </>
  );
}

export default App;
