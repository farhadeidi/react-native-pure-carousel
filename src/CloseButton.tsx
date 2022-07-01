import React from 'react';
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface CloseButtonProps extends TouchableOpacityProps {}
const CloseButton = React.memo<CloseButtonProps>(({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('./assets/close.png')}
          style={{ width: 24, height: 24, tintColor: 'white' }}
        />
      </View>
    </TouchableOpacity>
  );
});

export default CloseButton;
