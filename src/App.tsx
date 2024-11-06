import { useRef, useState } from "react";
import logoImg from "./assets/logo.png";
import { AVAILABLE_PLACES } from "./data.ts";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import Places from "./components/Places.tsx";
import { ModalRef, PlaceType } from "./types";

function App() {
  const modalRef = useRef<ModalRef>(null);
  const selectedPlaceRef = useRef<string>(null);
  const [pickedPlaces, setPickedPlaces] = useState<PlaceType[]>([]);

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
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlaceRef.current),
    );
    modalRef?.current?.close();
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
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
