import React from 'react';
import type { PureCarouselProps } from './PureCarousel';
import PureCarousel from './PureCarousel';
import Pagination from './Pagination';

const PureCarouselWrapper: React.FC<PureCarouselProps> = ({ ...props }) => {
  return <PureCarousel {...props} />;
};

export { PureCarouselWrapper as PureCarousel, Pagination };
export default PureCarouselWrapper;
