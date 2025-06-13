import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMais from "../../components/HeaderMais";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Title from "../../components/Title";
import Texto from "../../components/Texto";
import Listinha from "../../components/ListinhaCorretor"; 
import { IRegistro } from "../../interfaces/ICliente";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


function SobreCliente() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";


  const [registro, setRegistro] = useState<IRegistro | null>(null);
  const [corretor, setCorretor] = useState();
  const router = useRouter();

  useFocusEffect(
  useCallback(() => {
    if (!id) return;
    
    fetch(`http://192.168.15.10:8080/registros/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar registro");
        return res.json();
      })
      .then((data: IRegistro) => setRegistro(data))
      .catch(err => console.error(err));
  }, [id])
);


  const handleClienteOpen = () => {
    router.push("/src/screens/SobreCorretor");
  };

  function handleClose() {
    router.back();
  }

  function handleEditar() {
    if (!registro) return;

    const participante1 = registro.participante1;
    const participante2 = registro.participante2

    router.push({
      pathname: "/src/screens/Editar/ClienteEdit",
      params: {
        status: registro.estadoRegistro,
        segundoParticipante: String(registro.segundoParticipante),
        id: id,
        nome: participante1.nome,
        procura: registro.procura,
        tipoImovel: registro.tipo,
        email: participante1.email,
        dataNascimento: participante1.dataNascimento,
        cpf: participante1.cpf,
        estadoCivil: participante1.estadoCivil,
        telefone1: participante1.telefone1,
        telefone2: participante1.telefone2,
        imposto: participante1.declaraIRPF ? "Sim" : "Não",
        holerite: participante1.compromissoHolerite,
        restricao: participante1.restricaoNoNome ? "Sim" : "Não",
        valorRestricao: participante1.valorRestricao,
        tipoRenda: participante1.tipoDeRenda,
        rendaFormal: participante1.rendaBrutaFormal,
        rendaInformal: participante1.rendaBrutaInformal,
        tempoCarteira: participante1.umMesDeCarteiraAssinada ? "Sim" : "Não",
        usarFgts: participante1.vaiUtilizarFgts ? "Sim" : "Não",
        anoFgts: participante1.tresAnosFgts ? "Sim" : "Não",
        imovelNome: participante1.possuiImovelRegistradoNoNome ? "Sim" : "Não",
      },
    });
  }

  function getStatus() {
    switch (registro?.participante1.status.toLocaleLowerCase()) {
      case "andamento":
        return { texto: "Em andamento", style: styles.andamento };
      case "aberto":
        return { texto: "Em aberto", style: styles.aberto };
      case "encerrado":
        return { texto: "Encerrado", style: styles.encerrado };
      case "concluido":
        return { texto: "Concluído", style: styles.concluido };
      default:
        return { texto: "", style: {} };
    }
  }

  const { texto, style } = getStatus();

  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} editar handleClickEdit={handleEditar} />
      <View style={styles.sobreClienteArea}>
        <View style={styles.titulo}>
          <Title style={styles.sobreClienteNome}>{registro?.participante1.nome}</Title>
          <View style={[styles.estado, style]}>
            <Texto>{texto}</Texto>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.dataContainer}>
            <View style={styles.telefoneContainer}>
              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Procura</Texto>
                <Texto>{registro?.procura}</Texto>
              </View>

              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Tipo</Texto>
                <Texto>{registro?.tipo}</Texto>
              </View>
            </View>
            <View>
              <Texto style={styles.sobreClienteLabel}>Email</Texto>
              <Texto>{registro?.participante1.email}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Data de nascimento</Texto>
              <Texto>{registro?.participante1.dataNascimento}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>CPF</Texto>
              <Texto>{registro?.participante1.cpf}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Estado Civil</Texto>
              <Texto>{registro?.participante1.estadoCivil}</Texto>
            </View>

            <View style={styles.telefoneContainer}>
              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Telefone 1</Texto>
                <Texto>{registro?.participante1.telefone1}</Texto>
              </View>

              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Telefone 2</Texto>
                <Texto>{registro?.participante1.telefone2}</Texto>
              </View>
            </View>

            <Title style={styles.sobreClienteFinanceiroLabel}>Financeiro</Title>

            <View>
              <Texto style={styles.sobreClienteLabel}>Declara imposto de renda</Texto>
              <Texto>{registro?.participante1.declaraIRPF ? "Sim" : "Não"}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Tem compromisso financeiro no holerite?</Texto>
              <Texto>{registro?.participante1.compromissoHolerite}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Possui Restrição no nome?</Texto>
              <Texto>{registro?.participante1.restricaoNoNome ? "Sim" : "Não"}</Texto>
            </View>

            {registro?.participante1.valorRestricao && (
              <View>
                <Texto style={styles.sobreClienteLabel}>Valor da restrição</Texto>
                <Texto>{registro?.participante1.valorRestricao}</Texto>
              </View>
            )}

            <View>
              <Texto style={styles.sobreClienteLabel}>Tipo de Renda</Texto>
              <Texto>{registro?.participante1.tipoDeRenda}</Texto>
            </View>

            {registro?.participante1.rendaBrutaFormal && (
              <View>
                <Texto style={styles.sobreClienteLabel}>Renda bruta formal</Texto>
                <Texto>{registro?.participante1.rendaBrutaFormal}</Texto>
              </View>
            )}

            {registro?.participante1.rendaBrutaInformal && (
              <View>
                <Texto style={styles.sobreClienteLabel}>Renda bruta informal</Texto>
                <Texto>{registro?.participante1.rendaBrutaInformal}</Texto>
              </View>
            )}

            {registro?.participante1.rendaBrutaInformal && (
              <View>
                <Texto style={styles.sobreClienteLabel}>Mais de 1 mês de carteira assinada?</Texto>
                <Texto>{registro?.participante1.umMesDeCarteiraAssinada ? "Sim" : "Não"}</Texto>
              </View>
            )}

            <View>
              <Texto style={styles.sobreClienteLabel}>Vai utilizar FGTS?</Texto>
              <Texto>{registro?.participante1.vaiUtilizarFgts ? "Sim" : "Não"}</Texto>
            </View>

            {registro?.participante1.tresAnosFgts && (
              <View>
                <Texto style={styles.sobreClienteLabel}>Mais de 3 anos de FGTS?</Texto>
                <Texto>{registro?.participante1.tresAnosFgts ? "Sim" : "Não"}</Texto>
              </View>
            )}

            <View>
              <Texto style={styles.sobreClienteLabel}>Imóvel registrado no nome?</Texto>
              <Texto>{registro?.participante1.possuiImovelRegistradoNoNome ? "Sim" : "Não"}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>
                Possui algum familiar ou amigo que possa complementar a renda?
              </Texto>
              <Texto>Faculdade</Texto>
            </View>
          </View>
          <View style={{ height: 10 }} />
          {corretor&&
            <Pressable onPress={handleClienteOpen}>
              <Listinha nomeCorretor={corretor.nome} emailCorretor={corretor.email} status={corretor.status} />
            </Pressable>
          }
          
          
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


export default SobreCliente;

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
  dataContainer:{
    marginVertical: 12
  },
  andamento: {
        backgroundColor: '#cecece',
        borderColor:'#9C9797'
    },
    aberto: {
        backgroundColor: '#B9D9B7',
        borderColor:'#6C8664'
    },
    encerrado: {
        backgroundColor: '#FFA3A3',
        borderColor:'#8F3535'
    },
    concluido: {
        backgroundColor: '#87C0FF',
        borderColor:'#46358F'
    },
    estado:{
      marginTop: 10,
      marginHorizontal: 12,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth:1 ,
    },
    titulo: {
      marginBottom:10
    }
});









