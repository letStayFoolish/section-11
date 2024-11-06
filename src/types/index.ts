export type ModalRef = HTMLDialogElement & ModalRefMethods;

export type ModalRefMethods = {
  open: () => void;
  close: () => void;
};

export type PlaceType = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat: number;
  lon: number;
};
