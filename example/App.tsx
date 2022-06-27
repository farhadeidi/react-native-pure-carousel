import React from 'react';
import { View } from 'react-native';
import PureCarousel from 'react-native-pure-carousel';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PureCarousel name="John" />
    </View>
  );
}
