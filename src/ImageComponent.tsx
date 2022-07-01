import React, { useRef } from 'react';
import { Animated, Image, Pressable, ScrollView } from 'react-native';
import type { PureImageProps } from './PureCarousel';

interface ImageComponentProps extends PureImageProps {
  onPress?: (index: number) => void;
  imageIndex?: number;
  width: number;
  height: number;
  preferOriginal?: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  width,
  height,
  imageIndex,
  onPress,
  source,
  originalSource,
  preferOriginal,
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
        <Image
          resizeMode="cover"
          source={preferOriginal ? originalSource || source : source}
          {...props}
        />
      </Pressable>
    </Animated.ScrollView>
  );
};

export default ImageComponent;
