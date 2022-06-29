import React, { useRef } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Pagination, { PaginationProps } from './Pagination';

export interface CarouselImageProps extends ImageProps {
  onPress?: (index: number) => void;
}

export interface PureCarouselProps extends ViewProps {
  images: ImageProps[];
  onPress?: (index: number) => void;
  width?: number;
  height?: number;
  showPagination?: boolean;
  renderPagination?: (props: PaginationProps) => JSX.Element | React.ReactNode;
  paginationProps?: Partial<PaginationProps>;
  paginationWrapperStyle?: StyleProp<ViewStyle>;
  onChangeIndex?: (value: number) => void;
}

const PureCarousel: React.FC<PureCarouselProps> = ({
  images,
  onPress,
  width: initialWidth,
  height = 240,
  showPagination = true,
  renderPagination,
  paginationProps,
  paginationWrapperStyle,
  onChangeIndex,
  ...props
}) => {
  const dimensions = useWindowDimensions();
  const width = initialWidth || dimensions.width;

  const scrollViewRef = useRef<FlatList>(null);
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    onChangeIndex!(currentIndex);
  };

  return (
    <View>
      <View
        {...props}
        style={[
          { width: width, height: height, overflow: 'hidden' },
          props.style,
        ]}
      >
        <Animated.FlatList
          ref={scrollViewRef}
          maxToRenderPerBatch={3}
          keyExtractor={(_, index) => index.toString()}
          data={images}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={
                  onPress
                    ? () => {
                        onPress(index);
                      }
                    : undefined
                }
              >
                <Image
                  {...item}
                  style={[{ width: width, height }, item.style]}
                />
              </Pressable>
            );
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onChangeIndex ? handleScroll : undefined}
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
        />
      </View>
      {showPagination && (
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 2,
            },
            paginationWrapperStyle,
          ]}
        >
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
        </View>
      )}
    </View>
  );
};

export default PureCarousel;
