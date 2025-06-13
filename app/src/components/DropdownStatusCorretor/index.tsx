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

export type EstadoCorretor = "ATIVO" | "INATIVO";

type Props = {
  label: string;
  valor: EstadoCorretor | "";
  onChange: (valor: EstadoCorretor) => void;
};

const opcoesStatus: { label: string; value: EstadoCorretor }[] = [
  { label: "Ativo", value: "ATIVO" },
  { label: "Inativo", value: "INATIVO" },
];

export default function DropdownStatusCorretor({ label, valor, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const selectOption = (option: EstadoCorretor) => {
    onChange(option);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={openModal} style={styles.selector}>
        <Text style={styles.selectorText}>{valor || "Selecione..."}</Text>
      </Pressable>

      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
          >
            <Text style={styles.modalTitle}>Selecione o status</Text>

            {opcoesStatus.map((item) => (
              <TouchableOpacity key={item.value} onPress={() => selectOption(item.value)}>
                <Text style={styles.option}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={closeModal}>
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
    shadowOffset: { width: 0, height: -2 },
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
