import React, { useRef } from 'react';
import {
  Animated,
  Image,
  ImageProps,
  Pressable,
  ScrollView,
} from 'react-native';

interface ImageComponentProps extends ImageProps {
  onPress?: (index: number) => void;
  imageIndex?: number;
  width: number;
  height: number;
}
const ImageComponent: React.FC<ImageComponentProps> = ({
  width,
  height,
  imageIndex,
  onPress,
  ...props
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      minimumZoomScale={1}
      maximumZoomScale={3}
      zoomScale={1}
      style={{ height: height }}
      scrollEnabled={false}
      onTouchEnd={() => {
        scrollViewRef.current?.scrollResponderZoomTo({
          x: 0,
          y: 0,
          width: width,
          height: height,
          animated: true,
        });
      }}
    >
      <Pressable
        onPress={
          onPress
            ? () => {
                onPress(imageIndex || 0);
              }
            : undefined
        }
      >
        <Image resizeMode="cover" {...props} />
      </Pressable>
    </Animated.ScrollView>
  );
};

export default ImageComponent;
