import TemplateNavScreen from "@/app/src/components/TemplateNavScreen";
import Listinha from "@/app/src/components/ListinhaCliente";
import Texto from "@/app/src/components/Texto";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
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

  const [filtroStatus, setFiltroStatus] = useState<string[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string[]>([]);

  const router = useRouter();
  const slideAnim = useState(new Animated.Value(300))[0];

  useEffect(() => {
    const mockClientes: IClienteLista[] = [
      { nome: "João", tipoImovel: "Apartamento", corretor: "Maria", status: "andamento", estadoImovel: "Novo" },
      { nome: "Ana", tipoImovel: "Casa", corretor: "Carlos", status: "aberto", estadoImovel: "Usado" },
      { nome: "Bruno", tipoImovel: "Casa", corretor: "Carlos", status: "encerrado", estadoImovel: "Novo" },
      { nome: "Mariana", tipoImovel: "Casa", corretor: "Carlos", status: "aberto", estadoImovel: "Usado" },
      { nome: "Fernanda", tipoImovel: "Apartamento", corretor: "Carlos", status: "andamento", estadoImovel: "Novo" },
    ];
    setClientes(mockClientes);
    setClientesFiltrados(mockClientes);
  }, []);

  useEffect(() => {
    const termo = pesquisa.toLowerCase();
    const filtrado = clientes.filter((cliente) => {
      const nomeOk = cliente.nome.toLowerCase().includes(termo);
      const statusOk = filtroStatus.length > 0 ? filtroStatus.includes(cliente.status) : true;
      const tipoOk = filtroTipo.length > 0 ? filtroTipo.includes(cliente.tipoImovel) : true;
      const estadoOk = filtroEstado.length > 0 ? filtroEstado.includes(cliente.estadoImovel) : true;
      return nomeOk && statusOk && tipoOk && estadoOk;
    });
    setClientesFiltrados(filtrado);
  }, [pesquisa, clientes, filtroStatus, filtroTipo, filtroEstado]);

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

  const toggleFiltro = (
    valor: string,
    filtros: string[],
    setFiltros: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (filtros.includes(valor)) {
      setFiltros(filtros.filter((item) => item !== valor));
    } else {
      setFiltros([...filtros, valor]);
    }
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
        filtroAtivo={filtroStatus.length > 0}
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
                {["andamento", "aberto", "encerrado"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => toggleFiltro(status, filtroStatus, setFiltroStatus)}
                    style={[
                      styles.filtroCaixa,
                      filtroStatus.includes(status) && styles.filtroSelecionado,
                    ]}
                  >
                    <Texto>
                      {status === "andamento"
                        ? "Em Andamento"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </Texto>
                  </TouchableOpacity>
                ))}
              </View>

              <Texto style={styles.filtroLabel}>Tipo</Texto>
              <View style={styles.filtroSection}>
                {["Apartamento", "Casa"].map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    onPress={() => toggleFiltro(tipo, filtroTipo, setFiltroTipo)}
                    style={[
                      styles.filtroCaixa,
                      filtroTipo.includes(tipo) && styles.filtroSelecionado,
                    ]}
                  >
                    <Texto>{tipo}</Texto>
                  </TouchableOpacity>
                ))}
              </View>

              <Texto style={styles.filtroLabel}>Estado</Texto>
              <View style={styles.filtroSection}>
                {["Novo", "Usado"].map((estado) => (
                  <TouchableOpacity
                    key={estado}
                    onPress={() => toggleFiltro(estado, filtroEstado, setFiltroEstado)}
                    style={[
                      styles.filtroCaixa,
                      filtroEstado.includes(estado) && styles.filtroSelecionado,
                    ]}
                  >
                    <Texto>{estado}</Texto>
                  </TouchableOpacity>
                ))}
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
    flexWrap: "wrap",
    marginBottom: 10,
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
  filtroSelecionado: {
    backgroundColor: "#B9D9B7",
    borderColor: "#6C8664",
  },
});
