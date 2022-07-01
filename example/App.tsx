import React from 'react';
import { View } from 'react-native';
import PureCarousel from 'react-native-pure-carousel';

const imageIds = [1070, 1059, 1025, 1014, 1012, 1013];
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
      <PureCarousel
        images={imageIds.map((el) => ({
          source: { uri: `https://picsum.photos/id/${el}/720/480` },
          originalSource: { uri: `https://picsum.photos/id/${el}/1280/720` },
        }))}
      />
    </View>
  );
}
