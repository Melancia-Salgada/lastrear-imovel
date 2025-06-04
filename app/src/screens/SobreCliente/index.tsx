import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMais from "../../components/HeaderMais";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Title from "../../components/Title";
import Texto from "../../components/Texto";
import Listinha from "../../components/ListinhaCorretor"; // Importe Listinha

function SobreCliente() {
  const router = useRouter();
  const [cliente, setCliente] = useState({
    status: 'concluido',
    nome: "Gabriel Almeida",
    procura: "Apartamento",
    tipoImovel: "Novo",
    email: "gabriel@email.com",
    dataNascimento: "10/05/2004",
    cpf: "123.456.789-00",
    estadoCivil: "Solteiro",
    telefone1: "(11) 91234-5678",
    telefone2: "(11) 99876-5432",
    nacionalidade: "Brasileiro",
    escolaridade: "Ensino Superior Completo",
    imposto: "Sim",
    holerite: "Não",
    restricao: "Sim",
    valorRestricao: "R$ 1.200,00",
    tipoRenda: "Mista",
    rendaFormal: "R$ 3.500,00",
    rendaInformal: "R$ 1.200,00",
    tempoCarteira: "Sim",
    usarFgts: "Sim",
    anoFgts: "Sim",
    imovelNome: "Não",
  });

  function handleClose() {
    router.back();
  }

  let txt = ''

  function checkStatus() {
        switch (cliente.status) {
            case 'andamento':
                txt='Em andamento'
                return styles.andamento
            case 'aberto':
                txt='Em aberto'
                return styles.aberto
            case 'encerrado':
                txt='Encerrado'
                return styles.encerrado
            case 'concluido':
                txt='Concluído'
                return styles.concluido
            default:
                break;
        }
    }

  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} editar />
      <View style={styles.sobreClienteArea}>
        <View style={styles.titulo}>
          <Title style={styles.sobreClienteNome}>{cliente.nome}</Title>
        <View style={[styles.estado, checkStatus()]}>
                    <Texto>{txt}</Texto>
                </View>
        </View>
        

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.dataContainer}>
            
            <View style={styles.telefoneContainer}>
              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Procura</Texto>
                <Texto>{cliente.procura}</Texto>
              </View>

              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Tipo</Texto>
                <Texto>{cliente.tipoImovel}</Texto>
              </View>
            </View>
            <View>
              <Texto style={styles.sobreClienteLabel}>Email</Texto>
              <Texto>{cliente.email}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Data de nascimento</Texto>
              <Texto>{cliente.dataNascimento}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>CPF</Texto>
              <Texto>{cliente.cpf}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Estado Civil</Texto>
              <Texto>{cliente.estadoCivil}</Texto>
            </View>

            <View style={styles.telefoneContainer}>
              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Telefone 1</Texto>
                <Texto>{cliente.telefone1}</Texto>
              </View>

              <View style={styles.telefoneItem}>
                <Texto style={styles.sobreClienteLabel}>Telefone 2</Texto>
                <Texto>{cliente.telefone2}</Texto>
              </View>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>Nacionalidade</Texto>
              <Texto>{cliente.nacionalidade}</Texto>
            </View>
            <View>
              <Texto style={styles.sobreClienteLabel}>Escolaridade</Texto>
              <Texto>{cliente.escolaridade}</Texto>
            </View>

            <Title style={styles.sobreClienteFinanceiroLabel}>Financeiro</Title>

            <View>
              <Texto style={styles.sobreClienteLabel}>
                Declara imposto de renda
              </Texto>
              <Texto>{cliente.imposto}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>
                Tem compromisso financeiro no holerite?
              </Texto>
              <Texto>{cliente.holerite}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>
                Possui Restrição no nome ?
              </Texto>
              <Texto>{cliente.restricao}</Texto>
            </View>

            {cliente.valorRestricao && (
              <View>
                <Texto style={styles.sobreClienteLabel}>
                  Possui Restrição no nome ?
                </Texto>
                <Texto>{cliente.valorRestricao}</Texto>
              </View>
            )}

            <View>
              <Texto style={styles.sobreClienteLabel}>Tipo de Renda</Texto>
              <Texto>{cliente.tipoRenda}</Texto>
            </View>

            {cliente.rendaFormal && (
              <View>
                <Texto style={styles.sobreClienteLabel}>
                  Renda brutal formal
                </Texto>
                <Texto>{cliente.rendaFormal}</Texto>
              </View>
            )}

            {cliente.rendaInformal && (
              <View>
                <Texto style={styles.sobreClienteLabel}>
                  Renda brutal informal
                </Texto>
                <Texto>{cliente.rendaInformal}</Texto>
              </View>
            )}

            {cliente.rendaInformal && (
              <View>
                <Texto style={styles.sobreClienteLabel}>
                  Mais de 1 mes de carteira assinada?
                </Texto>
                <Texto>{cliente.tempoCarteira}</Texto>
              </View>
            )}

            <View>
              <Texto style={styles.sobreClienteLabel}>Vai utilizar FGTS?</Texto>
              <Texto>{cliente.usarFgts}</Texto>
            </View>

            {cliente.anoFgts && (
              <View>
                <Texto style={styles.sobreClienteLabel}>
                  Mais de 3 anos de FGTS?
                </Texto>
                <Texto>{cliente.anoFgts}</Texto>
              </View>
            )}

            <View>
              <Texto style={styles.sobreClienteLabel}>
                Imovel registrado no nome ?
              </Texto>
              <Texto>{cliente.imovelNome}</Texto>
            </View>

            <View>
              <Texto style={styles.sobreClienteLabel}>
                Possui algum familiar ou amigo que possa complentar a renda?
              </Texto>
              <Texto>Faculdade</Texto>
            </View>
          </View>
          <View style={{ height: 10 }} />
          <Listinha
            nomeCorretor={"fdasda"}
            emailCorretor={"sexo"}
            status={"ativo"}
          />
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









