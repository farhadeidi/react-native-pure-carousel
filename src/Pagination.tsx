import React, { useCallback } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

type Modes = 'circle' | 'line';

export interface PaginationProps {
  horizontalAnimatedScrollPosition: Animated.Value;
  itemsCount: number;
  containerWidth?: number;
  mode?: Modes;
  circleSize?: number;
  lineWidth?: number;
  lineHeight?: number;
  itemBackgroundColor?: string;
  itemActiveBackgroundColor?: string;
  gutterSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  horizontalAnimatedScrollPosition,
  itemsCount,
  circleSize = 8,
  lineWidth,
  lineHeight = 2,
  containerWidth,
  itemBackgroundColor = '#e2e8f0',
  mode = 'line',
  gutterSize = 4,
  itemActiveBackgroundColor = '#334155',
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const hasMaxWidth = mode === 'circle' || !!lineWidth;
  const width = containerWidth || screenWidth;
  const indicatorWidth =
    mode === 'circle'
      ? circleSize + gutterSize
      : lineWidth || width / itemsCount;

  const getWrapperWidth = useCallback(() => {
    if (mode === 'line') {
      if (lineWidth) {
        return lineWidth * itemsCount;
      }
      return containerWidth || width;
    }

    return (circleSize + gutterSize) * itemsCount;
  }, [mode, lineWidth, itemsCount, width, containerWidth]);

  const indicatorPosition = horizontalAnimatedScrollPosition.interpolate({
    inputRange: [0, width * itemsCount],
    outputRange: [0, getWrapperWidth()],
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      ...(hasMaxWidth && {
        maxWidth: width,
        overflow: 'hidden',
      }),
    },
    itemWrapper: {
      paddingHorizontal: gutterSize / 2,
      width: indicatorWidth,
    },

    item: {
      backgroundColor: itemBackgroundColor,
    },

    circle: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
    },

    line: {
      height: lineHeight,
    },

    activeItem: {
      backgroundColor: itemActiveBackgroundColor,
    },
  });

  return (
    <View style={[styles.container]}>
      {[...Array(itemsCount)].map((_, index) => {
        return (
          <View style={[styles.itemWrapper]} key={index}>
            <View style={[styles.item, styles[mode]]} />
          </View>
        );
      })}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{ translateX: indicatorPosition }],
          },
          styles.itemWrapper,
        ]}
      >
        <View style={[styles.item, styles.activeItem, styles[mode]]} />
      </Animated.View>
    </View>
  );
};

export default Pagination;
