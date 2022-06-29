import type { Animated, ViewProps } from 'react-native';

export interface IndicatorsProps extends ViewProps {
  horizontalAnimatedScrollPosition: Animated.Value;
  itemsCount: number;
  containerWidth?: number;
  gutterSize?: number;
  height?: number;
  backgroundColor?: string;
  activeBackgroundColor?: string;
}
