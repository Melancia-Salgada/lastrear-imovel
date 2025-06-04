import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderMais from '../../components/HeaderMais'
import { useRouter } from 'expo-router'
import { Animated, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Title from '../../components/Title'
import Texto from '../../components/Texto'
import HeaderSearch from '../../components/HeaderSearch'
import { IClienteLista } from '../../interfaces/IClienteLista'
import Listinha from '../../components/ListinhaCliente'

function SobreCorretor() {
  const [modalVisible, setModalVisible] = useState(false);
  const [clientes, setClientes] = useState<IClienteLista[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<IClienteLista[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string[]>([]);

  const router = useRouter()

  function handleClose() {
    router.back()
  }


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

  const handleClienteOpen = () => {
    router.push("/src/screens/SobreCliente");
  };

  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} editar />
      <ScrollView>
        <View style={styles.sobreClienteArea}>
          <Title style={styles.sobreClienteNome}>
            Gabriel Almeida Ferreira
          </Title>
          <Texto style={styles.sobreClienteLabel}>
            Email
          </Texto>
          <Texto>
            exemplo@exemplo.com
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Telefone
          </Texto>
          <Texto>
            2131323416
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            CPF
          </Texto>
          <Texto>
            123.456-78
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Data de nascimento
          </Texto>
          <Texto>
            12/12/2021
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Especialidade
          </Texto>
          <Texto>
            corretor
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Data de cadastro
          </Texto>
          <Texto>
            12/12/2021
          </Texto>
        </View>

        <ScrollView style={styles.scroll}>
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
        </ScrollView>
      </ScrollView>


    </SafeAreaView>
  )
}

export default SobreCorretor

const styles = StyleSheet.create({
  novo: {
    backgroundColor: '#fff',
    flex: 1
  },
  sobreClienteArea: {
    paddingHorizontal: 16,
    flex: 1,
  },
  sobreClienteNome: {
    fontWeight: 'bold',
    marginBottom: 15,
    paddingTop: 16,
  },
  sobreClienteLabel: {
    fontWeight: 'bold',
    marginVertical: 3
  },
  listaContainer: {
    justifyContent: "center",
    marginTop: 12,
    paddingBottom: 60,
  },
  scroll:{
    marginTop:12,
    paddingHorizontal:16
  }
})