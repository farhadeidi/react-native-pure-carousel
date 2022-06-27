import React from 'react';
import { ImageProps, Text, View, ViewProps } from 'react-native';

interface PureCarouselProps extends ViewProps {
  images: ImageProps[];
}
const PureCarousel: React.FC<PureCarouselProps> = ({ ...props }) => {
  return (
    <View {...props}>
      <Text>Hello</Text>
    </View>
  );
};

export default PureCarousel;
