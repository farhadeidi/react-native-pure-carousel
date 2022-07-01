import React from 'react';
import { View, ViewProps } from 'react-native';

interface ModalHeaderProps extends ViewProps {}
const ModalHeader = React.memo<ModalHeaderProps>(({ children, ...props }) => {
  return <View {...props}>{children}</View>;
});

export default ModalHeader;
