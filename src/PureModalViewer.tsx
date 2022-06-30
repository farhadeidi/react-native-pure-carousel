import React, { useState } from 'react';
import {
  ImageProps,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import PureCarousel from './PureCarousel';

let initialIndex = 0;

interface PureModalViewerProps extends ViewProps {
  images: ImageProps[];
  initialIndex?: number;
  onModalClose: (index: number) => void;
}

const PureModalViewer = React.forwardRef<any, PureModalViewerProps>(
  ({ images, onModalClose, ...props }, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dimensions = useWindowDimensions();

    const openModal = (index = 0) => {
      initialIndex = index;
      setIsModalVisible(true);
    };

    const closeModal = () => {
      setIsModalVisible(false);
      onModalClose(initialIndex);
    };

    React.useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    return (
      <View {...props}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {
            closeModal();
          }}
        >
          <View style={{ flex: 1, backgroundColor: '#334155' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 100,
                  right: 30,
                  zIndex: 99,
                }}
                onPress={() => {
                  closeModal();
                }}
              >
                <Text>Close</Text>
              </TouchableOpacity>
              {isModalVisible && (
                <PureCarousel
                  images={images}
                  width={dimensions.width}
                  height={dimensions.height}
                  showPagination={false}
                  imageConfigs={{ resizeMode: 'contain' }}
                  initialIndex={initialIndex}
                  onChangeIndex={(index) => {
                    initialIndex = index;
                  }}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

export default PureModalViewer;
