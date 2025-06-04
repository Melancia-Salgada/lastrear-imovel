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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Clientes() {
  const [modalVisible, setModalVisible] = useState(false);

  const[clientes, setClientes] = useState<IClienteLista[]>([])
  const [clientesFiltrados, setClientesFiltrados] = useState<IClienteLista[]>([])


  const router = useRouter()
  
  const [pesquisa, setPesquisa] = useState('')

  useEffect(() => {
  const mockClientes: IClienteLista[] = [
    //simula Chamada de API
    { nome: "João", tipoImovel: "Apartamento", corretor: "Maria", estado: "andamento" },
    { nome: "Ana", tipoImovel: "Casa", corretor: "Carlos", estado: "aberto" },
    { nome: "Bruno", tipoImovel: "Casa", corretor: "Carlos", estado: "encerrado" },
    { nome: "Mariana", tipoImovel: "Casa", corretor: "Carlos", estado: "aberto" },
    { nome: "Fernanda", tipoImovel: "Apartamento", corretor: "Carlos", estado: "andamento" },
  ];
  setClientes(mockClientes);
  setClientesFiltrados(mockClientes); 
}, []);



  //Filtra Clientes pra pesquisa
  useEffect(() => {
  const termo = pesquisa.toLowerCase();
  const filtrado = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(termo)
  );
  setClientesFiltrados(filtrado);
}, [pesquisa, clientes]);
  

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

  const handleClienteClose = () => {
    router.push('/src/screens/SobreCliente')
  }

  return (
    <TemplateNavScreen label="Clientes">
      <HeaderSearch valor={pesquisa} onChange={setPesquisa} handleClickFiltro={handleOpenModal}/>


      <View style={styles.listaContainer}>
        <ScrollView>
      {clientesFiltrados.map((item, index) => (
        <Pressable onPress={handleClienteClose} 
          key={index}>
          <Listinha
          nomeCliente={item.nome}
          tipoImovel={item.tipoImovel}
          nomeCorretor={item.corretor}
          estadoNegocio={item.estado}
        />
        </Pressable>
        
      ))}
      </ScrollView>
      </View>
      

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
            <View style={styles.cabecalhoModal}>
              <Title style={styles.tituloModal}>
                Filtros
              </Title>
            </View>
            <View style={styles.filtroModal}>
              //Status
              <Texto style={styles.filtroLabel}>
                Status
              </Texto>
              <View style={styles.filtroSection} >
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Em Andamento
                  </Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Aberto
                  </Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Encerrado
                  </Texto>
                </TouchableOpacity>
              </View>

              //Tipo
              <Texto style={styles.filtroLabel}>
                Tipo
              </Texto>
              <View style={styles.filtroSection} >
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Apartamento
                  </Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Casa
                  </Texto>
                </TouchableOpacity>
              </View>

              //Estado
              <Texto style={styles.filtroLabel}>
                Estado
              </Texto>
              <View style={styles.filtroSection} >
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Novo
                  </Texto>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filtroCaixa}>
                  <Texto>
                    Usado
                  </Texto>
                </TouchableOpacity>
              </View>
              

            </View> 
              
          </Pressable>
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
    alignItems: 'flex-start',
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
  listaContainer: {
    justifyContent: 'center',
    marginTop: 12,
    paddingBottom:60
  },
  cabecalhoModal:{
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    paddingBottom:8,
    borderBottomWidth:1,
    width:'100%',
    marginBottom:22
  },
  tituloModal:{
    fontWeight:'bold',
    fontSize:24
  },
  filtroModal:{

  },
  filtroLabel:{
    fontSize:14,
    marginBottom:5
  },
  filtroSection:{
    flexDirection: 'row',
  },
  filtroCaixa:{
    borderWidth:1,
    borderColor:'#9C9797',
    borderRadius:12,
    padding:6,
    marginRight:12,
    backgroundColor:'#efefef',
    marginBottom:7
  }
});
