import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { StyledText } from "./StyledText";
import { CrossIcon } from "../icons/Cross";

type Props = {
  modalVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  modalClassName?: string;
  showCloseButton?: boolean;
};

export const ModalComponent = ({
  modalVisible,
  modalClassName,
  title,
  children,
  onClose,
  showCloseButton = true,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onClose}
      className="flex items-center justify-center"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="items-center bg-black/45 pt-40 h-full relative"
      >
        <View className="w-full" onStartShouldSetResponder={() => true}>
          <View
            className={`relative bg-white shadow-md p-6 rounded-xl w-11/12 mx-auto z-50 ${modalClassName}`}
          >
            {showCloseButton && (
              <Pressable
                style={{ boxShadow: "2px 2px 0px 0px #A09FA8" }}
                className="absolute z-10 top-4 border right-4 bg-gray-100 rounded-lg p-2"
                onPress={onClose}
              >
                <CrossIcon width={18} height={18} color="#172823" />
              </Pressable>
            )}

            {title && (
              <StyledText weight="black" className="text-2xl  mb-4">
                {title}
              </StyledText>
            )}
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
