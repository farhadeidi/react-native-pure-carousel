import React from 'react';
import type { PureCarouselProps } from './PureCarousel';
import PureCarousel from './PureCarousel';
import Pagination from './Pagination';
import { View } from 'react-native';
import type { ModalRef, PureCarouselRef } from './types';
import PureModalViewer from './PureModalViewer';

const PureCarouselWrapper: React.FC<PureCarouselProps> = ({
  onImagePress,
  ...props
}) => {
  const carouselRef = React.useRef<PureCarouselRef>(null);
  const modalRef = React.useRef<ModalRef>(null);

  return (
    <View>
      <PureCarousel
        ref={carouselRef}
        onImagePress={(index) => {
          modalRef.current?.openModal(index);
          if (onImagePress) {
            onImagePress(index);
          }
        }}
        {...props}
      />

      <PureModalViewer
        ref={modalRef}
        images={props.images}
        onModalClose={(index) => {
          carouselRef.current?.goToIndex(index);
        }}
      />
    </View>
  );
};

export { PureCarouselWrapper as PureCarousel, Pagination };
export default PureCarouselWrapper;
