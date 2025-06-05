import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMais from "../../components/HeaderMais";
import { useRouter } from "expo-router";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Title from "../../components/Title";
import Texto from "../../components/Texto";
import HeaderSearch from "../../components/HeaderSearch";
import Listinha from "../../components/ListinhaCliente";
import { IClienteLista } from "../../interfaces/IClienteLista";

function SobreCorretor() {
  const router = useRouter();

  const [clientes, setClientes] = useState<IClienteLista[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<IClienteLista[]>(
    []
  );
  const [pesquisa, setPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useState(new Animated.Value(300))[0];

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

  useEffect(() => {
    const mockClientes: IClienteLista[] = [
      {
        nome: "João",
        tipoImovel: "Apartamento",
        corretor: "Maria",
        status: "andamento",
        estadoImovel: "Novo",
      },
      {
        nome: "Ana",
        tipoImovel: "Casa",
        corretor: "Carlos",
        status: "aberto",
        estadoImovel: "Usado",
      },
      {
        nome: "Bruno",
        tipoImovel: "Casa",
        corretor: "Carlos",
        status: "encerrado",
        estadoImovel: "Novo",
      },
      {
        nome: "Mariana",
        tipoImovel: "Casa",
        corretor: "Carlos",
        status: "aberto",
        estadoImovel: "Usado",
      },
      {
        nome: "Fernanda",
        tipoImovel: "Apartamento",
        corretor: "Carlos",
        status: "andamento",
        estadoImovel: "Novo",
      },
    ];
    setClientes(mockClientes);
    setClientesFiltrados(mockClientes);
  }, []);

  useEffect(() => {
    const termo = pesquisa.toLowerCase();
    const filtrado = clientes.filter((cliente) => {
      const nomeOk = cliente.nome.toLowerCase().includes(termo);
      const statusOk =
        filtroStatus.length > 0 ? filtroStatus.includes(cliente.status) : true;
      const tipoOk =
        filtroTipo.length > 0 ? filtroTipo.includes(cliente.tipoImovel) : true;
      const estadoOk =
        filtroEstado.length > 0
          ? filtroEstado.includes(cliente.estadoImovel)
          : true;
      return nomeOk && statusOk && tipoOk && estadoOk;
    });
    setClientesFiltrados(filtrado);
  }, [pesquisa, clientes, filtroStatus, filtroTipo, filtroEstado]);

  const [corretor, setCorretor] = useState({
    status: "ativo",
    nome: "Gabriel Almeida Ferreira",
    email: "exemplo@exemplo.com",
    telefone: "2131323416",
    cpf: "123.456-78",
    dataNascimento: "12/12/2021",
    especialidade: "corretor",
    dataCadastro: "12/12/2021",
  });

  function handleClose() {
    router.back();
  }

  function handleClickEdit() {
  router.push({
    pathname: "/src/screens/Editar/CorretorEdit",
    params: {
      nome: corretor.nome,
      email: corretor.email,
      telefone: corretor.telefone,
      cpf: corretor.cpf,
      nascimento: corretor.dataNascimento,
      especialidade: corretor.especialidade,
    },
  });
}


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

  let txt = "";

  function checkStatus() {
    switch (corretor.status) {
      case "ativo":
        txt = "Ativo";
        return styles.ativo;
      case "inativo":
        txt = "Inativo";
        return styles.inativo;
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.novo}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <HeaderMais handleClickClose={handleClose} editar handleClickEdit={handleClickEdit} />

      {/* Dados do corretor fixos na tela */}
      <View>
        <View style={styles.titulo}>
          <Title style={styles.sobreClienteNome}>{corretor.nome}</Title>
          <View style={[styles.estado, checkStatus()]}>
            <Texto>{txt}</Texto>
          </View>
        </View>

        <View style={styles.scrollViewContent}>
          <Texto style={styles.sobreClienteLabel}>Email</Texto>
          <Texto>{corretor.email}</Texto>

          <Texto style={styles.sobreClienteLabel}>Telefone</Texto>
          <Texto>{corretor.telefone}</Texto>

          <Texto style={styles.sobreClienteLabel}>CPF</Texto>
          <Texto>{corretor.cpf}</Texto>

          <Texto style={styles.sobreClienteLabel}>Data de nascimento</Texto>
          <Texto>{corretor.dataNascimento}</Texto>

          <Texto style={styles.sobreClienteLabel}>Especialidade</Texto>
          <Texto>{corretor.especialidade}</Texto>

          <Texto style={styles.sobreClienteLabel}>Data de cadastro</Texto>
          <Texto>{corretor.dataCadastro}</Texto>
        </View>
      </View>

      {/* Lista de clientes rolável */}
      <View style={styles.pesquisa}>
        <HeaderSearch
          valor={pesquisa}
          onChange={setPesquisa}
          handleClickFiltro={handleOpenModal}
          filtroAtivo={filtroStatus.length > 0}
        />
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.listaContainer}>
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
        </View>
      </ScrollView>
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
                    onPress={() =>
                      toggleFiltro(status, filtroStatus, setFiltroStatus)
                    }
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
                    onPress={() =>
                      toggleFiltro(tipo, filtroTipo, setFiltroTipo)
                    }
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
                    onPress={() =>
                      toggleFiltro(estado, filtroEstado, setFiltroEstado)
                    }
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default SobreCorretor;

const styles = StyleSheet.create({
  novo: {
    backgroundColor: "#fff",
    flex: 1,
  },
  sobreClienteArea: {
    flex: 1,
  },
  sobreClienteNome: {
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sobreClienteLabel: {
    marginVertical: 5,
    fontFamily: "Poppins_700Regular",
    fontWeight: "700",
  },
  telefoneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  telefoneItem: {
    flex: 1,
    paddingRight: 8,
  },
  sobreClienteFinanceiroLabel: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 7,
  },
  dataContainer: {
    marginVertical: 12,
  },
  inativo: {
    backgroundColor: "#cecece",
    borderColor: "#9C9797",
  },
  ativo: {
    backgroundColor: "#B9D9B7",
    borderColor: "#6C8664",
  },
  estado: {
    marginTop: 10,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  titulo: {
    marginBottom: 10,
  },
  listaContainer: {
    justifyContent: "center",
    marginTop: 12,
    paddingBottom: 60,
  },
  scroll: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  pesquisa: {
    paddingHorizontal: 16,
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
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
