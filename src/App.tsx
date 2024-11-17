import { useCallback, useRef, useState } from "react";
import logoImg from "./assets/logo.png";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import Places from "./components/Places.tsx";
import { ModalRef, PlaceType } from "./types";
import AvailablePlaces from "./components/AvailablePlaces.tsx";
import { updateUsersPlaces } from "./api.ts";

function App() {
  console.count("App");
  /**
   * App component should be (re)executed 2 times (without StrictMode).
   *
   * (1) First time because an App component is initially loaded with `availableStates` as an empty array.
   * In the background, we're fetching and setting available states using `setPickedPlaces`.
   * (2) After available states are fetched and set, the App component shall be re-executed again, because of local state got updated.
   * */

  const modalRef = useRef<ModalRef>(null);
  const selectedPlaceRef = useRef<string>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userPlaces, setUserPlaces] = useState<PlaceType[]>([]);

  /**
   * useEffect:
   *
   * code inside useEffect will be executed only after the function component execution.
   * */

  function handleStartRemovePlace(place: PlaceType) {
    modalRef?.current?.open();
    selectedPlaceRef.current = place.id;
    setIsModalOpen(true);
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  async function handleSelectPlace(selectedPlace: PlaceType) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces || prevPickedPlaces.length === 0) {
        prevPickedPlaces = [];
      }

      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }

      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUsersPlaces([selectedPlace, ...userPlaces]);
    } catch (error: any) {
      console.error(error);
    }
  }

  /**
   * We should use `useCallback` React hook, when passing function as a dependency to `useEffect`!!!
   */
  const handleRemovePlace = useCallback(function handleRemovePlace() {}, []);

  return (
    <>
      <Modal ref={modalRef} isOpen={isModalOpen}>
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
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={false}
          loadingText={"Loading places..."}
        />
        <AvailablePlaces handleOnSelect={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
