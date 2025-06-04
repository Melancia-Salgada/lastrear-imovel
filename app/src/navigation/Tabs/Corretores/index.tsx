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
  const router = useRouter();

  // Animação
  const slideAnim = useState(new Animated.Value(300))[0];

  function handleClickNovo() {
    router.push("/src/screens/Novo");
  }

  const handleCorretorOpen = () => {
    router.push("/src/screens/SobreCorretor");
  };

  useEffect(() => {
    const mockCorretores: ICorretorLista[] = [
      { nome: "Ana Silva", email: "ana@imobiliaria.com", status: "ativo" },
      { nome: "Carlos Souza", email: "carlos@imob.com", status: "inativo" },
      { nome: "Beatriz Lima", email: "bia@vendas.com", status: "ativo" },
    ];
    setCorretores(mockCorretores);
    setCorretoresFiltrados(mockCorretores);
  }, []);

  useEffect(() => {
    const termo = pesquisa.toLowerCase();
    const filtrado = corretores.filter((corretor) =>
      corretor.nome.toLowerCase().includes(termo)
    );
    setCorretoresFiltrados(filtrado);
  }, [pesquisa, corretores]);

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

  return (
    <TemplateNavScreen label="Corretores">
      <HeaderSearch
        valor={pesquisa}
        onChange={setPesquisa}
        criar
        handleClickCriar={handleClickNovo}
        handleClickFiltro={handleOpenModal}
      />

      <View style={styles.listaContainer}>
        <ScrollView>
          {corretoresFiltrados.map((corretor, index) => (
            <Pressable onPress={handleCorretorOpen} key={index}>
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
              <TouchableOpacity style={styles.filtroCaixa}>
                <Texto>Ativo</Texto>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filtroCaixa}>
                <Texto>Inativo</Texto>
              </TouchableOpacity>
            </View>
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
    borderBottomWidth: 1,
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
    borderWidth: 1,
    borderColor: "#9C9797",
    borderRadius: 12,
    padding: 6,
    marginRight: 12,
    backgroundColor: "#efefef",
    marginBottom: 7,
  },
});
