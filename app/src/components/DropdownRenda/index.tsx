import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";

type Props = {
  label: string;
  valor: string;
  onChange: (valor: string) => void;
};

export default function DropdownRenda({ label, valor, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];

  const handleOpenModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleSelect = (opcao: string) => {
    onChange(opcao);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={handleOpenModal} style={styles.selector}>
        <Text style={styles.selectorText}>
          {valor ? valor : "Selecione..."}
        </Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
          >
            <Text style={styles.modalTitle}>Selecione a renda</Text>
            {["Formal", "Informal", "Ambos"].map((item) => (
              <TouchableOpacity key={item} onPress={() => handleSelect(item)}>
                <Text style={styles.option}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={[styles.option, { color: "red" }]}>Cancelar</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  selector: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#EFEFEF",
    paddingLeft: 20,
    justifyContent: "center",
    height: 58,
    paddingRight: 60,
  },
  selectorText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  option: {
    fontSize: 18,
    paddingVertical: 12,
  },
});
