import TemplateNavScreen from "@/app/src/components/TemplateNavScreen";

import Listinha from "@/app/src/components/Listinha";
import Texto from "@/app/src/components/Texto";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IClienteLista } from "@/app/src/interfaces/IClienteLista";
import HeaderSearch from "@/app/src/components/HeaderSearch";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Clientes() {
  const [modalVisible, setModalVisible] = useState(false);

  const[clientes, setClientes] = useState<IClienteLista[]>([])

  useEffect(() => {
    // Simulando uma chamada de API
    const mockClientes = [
      {
        nome: "João",
        tipoImovel: "Apartamento",
        corretor: "Maria",
        estado: "Em negociação",
      },
      {
        nome: "Ana",
        tipoImovel: "Casa",
        corretor: "Carlos",
        estado: "Concluído",
      },
    ];
    setClientes(mockClientes);
}, []);

  // Função para abrir o modal
  const handleOpenModal = () => {
    setModalVisible(true);
    console.log("Modal aberto");
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalVisible(false);
    console.log("Modal fechado");
  };

  return (
    <TemplateNavScreen label="Clientes">
      <HeaderSearch/>

      {clientes.map((item, index) => (
        <Listinha
          nomeCliente={item.nome}
          tipoImovel={item.tipoImovel}
          nomeCorretor={item.corretor}
          estadoNegocio={item.estado}
          key={index}
        />
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.centeredView} onPress={handleCloseModal}>
          <Pressable
            style={styles.modalView}
            onPress={(event) => event.stopPropagation()}
          >
            <Texto>Matheus Vital, com fé no pé</Texto>
            <Image
              style={styles.stretch}
              source={require("@/assets/images/comfenope.jpg")}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </TemplateNavScreen>
  );
}

export default Clientes;

const styles = StyleSheet.create({
  areaBusca: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight * 0.03,
  },
  campoBusca: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#efefef",
    width: windowWidth * 0.75,
    height: windowHeight * 0.07,
    borderRadius: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.03,
  },
  inputBusca: {
    width: "100%",
    height: 70,
    fontSize: 20,
  },
  botaoFiltro: {
    backgroundColor: "#efefef",
    width: windowWidth * 0.13,
    height: windowHeight * 0.07,
    borderRadius: windowHeight * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    height: windowHeight * 0.6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  stretch: {
    width: 400,
    height: 200,
    resizeMode: "stretch",
  },
});
