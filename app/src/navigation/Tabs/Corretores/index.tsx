import HeaderSearch from "@/app/src/components/HeaderSearch";
import TemplateNavScreen from "@/app/src/components/TemplateNavScreen";
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
import ListinhaCorretor from "../../../components/ListinhaCorretor";
import Texto from "@/app/src/components/Texto";
import Title from "@/app/src/components/Title";
import { useRouter } from "expo-router";
import { ICorretorLista } from "@/app/src/interfaces/ICorretorLista";

function Corretores() {
  const [modalVisible, setModalVisible] = useState(false);
  const [corretores, setCorretores] = useState<ICorretorLista[]>([]);
  const [corretoresFiltrados, setCorretoresFiltrados] = useState<ICorretorLista[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string[]>([]);
  const router = useRouter();

  const slideAnim = useState(new Animated.Value(300))[0];

  function handleClickNovo() {
    router.push("/src/screens/Novo");
  }

  

  useEffect(() => {
  async function fetchCorretores() {
    try {
      const resposta = await fetch("http://192.168.15.18:8080/corretores"); // troque pela URL real
      const data = await resposta.json();

      const adaptado: ICorretorLista[] = data.map((corretor: any) => ({
        nome: corretor.nomeCompleto || "Sem nome",
        email: corretor.email || "Sem email",
        status: (corretor.status || "INATIVO").toLowerCase(),
      })).reverse(); 

      setCorretores(adaptado);
      setCorretoresFiltrados(adaptado);
    } catch (error) {
      console.error("Erro ao buscar corretores:", error);
    }
  }

  fetchCorretores();
}, []);


  useEffect(() => {
    const termo = pesquisa.toLowerCase();

    const filtrado = corretores.filter((corretor) => {
      const nomeOk = corretor.nome.toLowerCase().includes(termo);
      const statusOk = filtroStatus.length === 0 || filtroStatus.includes(corretor.status);
      return nomeOk && statusOk;
    });

    setCorretoresFiltrados(filtrado);
  }, [pesquisa, corretores, filtroStatus]);

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

  const toggleFiltroStatus = (valor: string) => {
    if (filtroStatus.includes(valor)) {
      setFiltroStatus(filtroStatus.filter((item) => item !== valor));
    } else {
      setFiltroStatus([...filtroStatus, valor]);
    }
  };

  return (
    <TemplateNavScreen label="Corretores">
      <HeaderSearch
        valor={pesquisa}
        onChange={setPesquisa}
        criar
        handleClickCriar={handleClickNovo}
        handleClickFiltro={handleOpenModal}
        filtroAtivo={filtroStatus.length > 0}
      />

      <View style={styles.listaContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {corretoresFiltrados.map((corretor, index) => (
            <Pressable onPress={() => router.push({ pathname: '/src/screens/SobreCorretor', params: { id: corretor.id } })} key={index}>
              <ListinhaCorretor
                nomeCorretor={corretor.nome}
                emailCorretor={corretor.email}
                status={corretor.status}
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
            style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}
          >
            <View style={styles.cabecalhoModal}>
              <Title style={styles.tituloModal}>Filtros</Title>
            </View>

            <Texto style={styles.filtroLabel}>Status</Texto>
            <View style={styles.filtroSection}>
              {["ativo", "inativo"].map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => toggleFiltroStatus(status)}
                  style={[
                    styles.filtroCaixa,
                    filtroStatus.includes(status) && styles.filtroSelecionado,
                  ]}
                >
                  <Texto>{status.charAt(0).toUpperCase() + status.slice(1)}</Texto>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={handleCloseModal}>
    <Texto style={[ { color: "red", marginTop: 20 }]}>
      Cancelar
    </Texto>
  </TouchableOpacity>
          </Animated.View>
          
        </Pressable>
      </Modal>
    </TemplateNavScreen>
  );
}

export default Corretores;

const styles = StyleSheet.create({
  listaContainer: {
    justifyContent: "center",
    marginTop: 12,
    paddingBottom: 60,
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
  },
  cabecalhoModal: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 8,
    width: "100%",
    marginBottom: 22,
  },
  tituloModal: {
    fontWeight: "bold",
    fontSize: 24,
  },
  filtroLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  filtroSection: {
    flexDirection: "row",
  },
  filtroCaixa: {
    borderColor: "#9C9797",
    borderRadius: 12,
    padding: 6,
    marginRight: 12,
    backgroundColor: "#efefef",
    marginBottom: 7,
    borderWidth: 1,
  },
  filtroSelecionado: {
    backgroundColor: "#B9D9B7",
    borderColor: "#6C8664",
  }

});
