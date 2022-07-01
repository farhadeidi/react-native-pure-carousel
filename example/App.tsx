import React from 'react';
import { View } from 'react-native';
import PureCarousel from 'react-native-pure-carousel';

const localImages = [
  { source: require('./assets/thumbnails/netherlands.jpg') },
  { source: require('./assets/thumbnails/berlin.jpg') },
  { source: require('./assets/thumbnails/england.jpg') },
  { source: require('./assets/thumbnails/fiji.jpg') },
  { source: require('./assets/thumbnails/france.jpg') },
  { source: require('./assets/thumbnails/japan.jpg') },
  { source: require('./assets/thumbnails/singapore.jpg') },
  { source: require('./assets/thumbnails/thailand.jpg') },
  { source: require('./assets/thumbnails/usa.jpg') },
];

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
      }}
    >
      <PureCarousel images={localImages} />
    </View>
  );
}
