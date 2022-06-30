export type PureCarouselRef = {
  goNext: () => void;
  goPrev: () => void;
  goToIndex: (index: number) => void;
} | null;

export type ModalRef = {
  openModal: (index: number) => void;
  closeModal: () => void;
} | null;
