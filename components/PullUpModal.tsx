import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";

type PullUpModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isVisible: boolean;
};

const PullUpModal = ({ children, isVisible, onClose }: PullUpModalProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalContentInner}>
            <View style={styles.closeButtonContainer}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color="white"
                style={styles.closeButton}
                onPress={onClose}
              />
            </View>
            <View>{children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional, for a semi-transparent backdrop
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContentInner: {
    flexDirection: "column",
  },
  closeButtonContainer: {
    marginLeft: "auto",
    marginBottom: 15,
    margin: 5,
  },
  closeButton: {
    backgroundColor: "#088F8F",
    borderRadius: 5,
  },
});

export default PullUpModal;
