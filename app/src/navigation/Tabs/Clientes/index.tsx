import TemplateNavScreen from "@/app/src/components/TemplateNavScreen";
import Listinha from "@/app/src/components/ListinhaCliente";
import Texto from "@/app/src/components/Texto";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IClienteLista } from "@/app/src/interfaces/IClienteLista";
import HeaderSearch from "@/app/src/components/HeaderSearch";
import Title from "@/app/src/components/Title";
import { useRouter } from "expo-router";

function Clientes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [clientes, setClientes] = useState<IClienteLista[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<IClienteLista[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const router = useRouter();

  // Animação
  const slideAnim = useState(new Animated.Value(300))[0];

  useEffect(() => {
    const mockClientes: IClienteLista[] = [
      { nome: "João", tipoImovel: "Apartamento", corretor: "Maria", status: "andamento", estadoImovel: "Novo" },
      { nome: "Ana", tipoImovel: "Casa", corretor: "Carlos", status: "aberto", estadoImovel: "Usado" },
      { nome: "Bruno", tipoImovel: "Casa", corretor: "Carlos", status: "encerrado", estadoImovel: "Novo" },
      { nome: "Mariana", tipoImovel: "Casa", corretor: "Carlos", status: "aberto", estadoImovel: "Usado" },
      { nome: "Fernanda", tipoImovel: "Apartamento", corretor: "Carlos", status: "andamento", estadoImovel: "Novo" },
    ]
    setClientes(mockClientes);
    setClientesFiltrados(mockClientes);
  }, []);

  useEffect(() => {
    const termo = pesquisa.toLowerCase();
    const filtrado = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(termo)
    );
    setClientesFiltrados(filtrado);
  }, [pesquisa, clientes]);

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

  const handleClienteOpen = () => {
    router.push("/src/screens/SobreCliente");
  };

  return (
    <TemplateNavScreen label="Clientes">
      <HeaderSearch
        valor={pesquisa}
        onChange={setPesquisa}
        handleClickFiltro={handleOpenModal}
      />

      <View style={styles.listaContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {clientesFiltrados.map((item, index) => (
            <Pressable onPress={handleClienteOpen} key={index}>
              <Listinha
                nomeCliente={item.nome}
                tipoImovel={item.tipoImovel}
                nomeCorretor={item.corretor}
                status={item.status}
                estadoImovel={item.estadoImovel}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.centeredView} onPress={handleCloseModal}>
          <Animated.View
            style={[
              styles.modalView,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.cabecalhoModal}>
              <Title style={styles.tituloModal}>Filtros</Title>
            </View>

            <View style={styles.filtroModal}>
              <Texto style={styles.filtroLabel}>Status</Texto>
              <View style={styles.filtroSection}>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Em Andamento</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Aberto</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Encerrado</Texto>
                </TouchableOpacity>
              </View>

              <Texto style={styles.filtroLabel}>Tipo</Texto>
              <View style={styles.filtroSection}>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Apartamento</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Casa</Texto>
                </TouchableOpacity>
              </View>

              <Texto style={styles.filtroLabel}>Estado</Texto>
              <View style={styles.filtroSection}>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Novo</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>Usado</Texto>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </TemplateNavScreen>
  );
}

export default Clientes;

const styles = StyleSheet.create({
  campoBusca: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#efefef",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputBusca: {
    width: "100%",
    height: 70,
    fontSize: 20,
  },
  botaoFiltro: {
    backgroundColor: "#efefef",
    borderRadius: 12,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listaContainer: {
    justifyContent: "center",
    marginTop: 12,
    paddingBottom: 60,
  },
  cabecalhoModal: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 8,
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 22,
  },
  tituloModal: {
    fontWeight: "bold",
    fontSize: 24,
  },
  filtroModal: {},
  filtroLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  filtroSection: {
    flexDirection: "row",
  },
  filtroCaixa: {
    borderWidth: 1,
    borderColor: "#9C9797",
    borderRadius: 12,
    padding: 6,
    marginRight: 12,
    backgroundColor: "#efefef",
    marginBottom: 7,
  },
});
