import React from 'react';
import { Text, View, ViewProps } from 'react-native';

interface PureCarouselProps extends ViewProps {
  name?: string;
}
const PureCarousel: React.FC<PureCarouselProps> = ({ name, ...props }) => {
  return (
    <View {...props}>
      <Text>Hello {name}</Text>
    </View>
  );
};

export default PureCarousel;
