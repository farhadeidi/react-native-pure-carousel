import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ImageProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import ImageComponent from './ImageComponent';
import Pagination, { PaginationProps } from './Pagination';

export interface PureCarouselProps extends ViewProps {
  images: ImageProps[];
  imageConfigs?: Partial<ImageProps>;
  onImagePress?: (index: number) => void;
  width?: number;
  height?: number;
  initialIndex?: number;
  showPagination?: boolean;
  paginationProps?: Partial<PaginationProps>;
  onChangeIndex?: (index: number) => void;
  renderPagination?: (props: PaginationProps) => JSX.Element | React.ReactNode;
}

const PureCarousel = React.forwardRef<any, PureCarouselProps>(
  (
    {
      images,
      initialIndex,
      paginationProps,
      renderPagination,
      showPagination = true,
      imageConfigs,
      onImagePress,
      onChangeIndex,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dimensions = useWindowDimensions();

    const scrollViewRef = useRef<FlatList>(null);
    const scrollPosition = useRef(new Animated.Value(0)).current;

    const width = props.width || dimensions.width;
    const height = props.height || 260;

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / width);
      setCurrentIndex(index);
    };

    React.useEffect(() => {
      if (onChangeIndex) {
        onChangeIndex(currentIndex);
      }
    }, [currentIndex]);

    const goNext = () => {
      if (currentIndex < images.length - 1) {
        scrollViewRef.current?.scrollToOffset({
          animated: true,
          offset: (currentIndex + 1) * width,
        });
      }
    };
    const goPrev = () => {
      if (currentIndex > 0) {
        scrollViewRef.current?.scrollToOffset({
          animated: true,
          offset: (currentIndex - 1) * width,
        });
      }
    };

    const goToIndex = (index: number) => {
      scrollViewRef.current?.scrollToOffset({
        animated: true,
        offset: index * width,
      });
    };

    React.useImperativeHandle(ref, () => ({
      goNext,
      goPrev,
      goToIndex,
    }));

    return (
      <View {...props}>
        <Animated.FlatList
          ref={scrollViewRef}
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          pagingEnabled
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScroll}
          contentOffset={
            initialIndex ? { x: initialIndex * width, y: 0 } : undefined
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollPosition,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ImageComponent
                {...imageConfigs}
                {...item}
                onPress={onImagePress}
                imageIndex={index}
                width={width}
                height={height}
                style={[{ width, height }, imageConfigs?.style, item.style]}
              />
            );
          }}
        />
        {showPagination && (
          <React.Fragment>
            {renderPagination ? (
              renderPagination({
                horizontalAnimatedScrollPosition: scrollPosition,
                itemsCount: images.length,
                ...paginationProps,
              })
            ) : (
              <Pagination
                horizontalAnimatedScrollPosition={scrollPosition}
                itemsCount={images.length}
                containerWidth={width}
                {...paginationProps}
              />
            )}
          </React.Fragment>
        )}
      </View>
    );
  }
);

export default PureCarousel;
