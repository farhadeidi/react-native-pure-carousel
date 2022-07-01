import React, { useState } from 'react';
import {
  ImageProps,
  Modal,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import CloseButton from './CloseButton';
import ModalHeader from './components/ModalHeader';
import PureCarousel from './PureCarousel';

interface PureModalViewerProps extends ViewProps {
  images: ImageProps[];
  initialIndex?: number;
  onModalClose: (index: number) => void;
}

const PureModalViewer = React.forwardRef<any, PureModalViewerProps>(
  ({ images, onModalClose, ...props }, ref) => {
    const dimensions = useWindowDimensions();
    const [modalConfigs, setModalConfigs] = useState({
      index: 0,
      isOpen: false,
    });

    console.log('modalConfigs', modalConfigs);

    const openModal = (index = 0) => {
      setModalConfigs({
        index,
        isOpen: true,
      });
    };

    const closeModal = () => {
      setModalConfigs({
        ...modalConfigs,
        isOpen: false,
      });

      onModalClose(modalConfigs.index);
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
          visible={modalConfigs.isOpen}
          onRequestClose={() => {
            closeModal();
          }}
        >
          <View style={{ flex: 1, backgroundColor: '#000000' }}>
            <StatusBar barStyle="light-content" />
            <PureCarousel
              images={images}
              width={dimensions.width}
              height={dimensions.height}
              showPagination={false}
              imageConfigs={{ resizeMode: 'contain' }}
              initialIndex={modalConfigs.index || 0}
              onChangeIndex={(index) => {
                setModalConfigs({ ...modalConfigs, index });
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
              }}
            >
              <SafeAreaView
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <ModalHeader style={{ padding: 16 }}>
                  <CloseButton
                    onPress={() => {
                      closeModal();
                    }}
                  />
                </ModalHeader>
                {/* <View style={{ padding: 16 }}>
                </View> */}
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
);

export default PureModalViewer;
