import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMais from '../../components/HeaderMais';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import Title from '../../components/Title';
import Texto from '../../components/Texto';
import Listinha from '../../components/ListinhaCorretor'; // Importe Listinha

function SobreCliente() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} editar />
      <View style={styles.sobreClienteArea}>
        <Title style={styles.sobreClienteNome}>
          Gabriel Almeida Ferreira
        </Title>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
    
          <Texto style={styles.sobreClienteLabel}>
            Email
          </Texto>
          <Texto>
            exemplo@exemplo.com
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Data de nascimento
          </Texto>
          <Texto>
            99/99/9999
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            CPF
          </Texto>
          <Texto>
            123.456-78
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Estado Civil
          </Texto>
          <Texto>
            Souteiro
          </Texto>
          <View style={styles.telefoneContainer}>
            <View style={styles.telefoneItem}>
              <Texto style={styles.sobreClienteLabel}>
                Telefone 1
              </Texto>
              <Texto>
                123456879
              </Texto>
            </View>

            <View style={styles.telefoneItem}>
              <Texto style={styles.sobreClienteLabel}>
                Telefone 2
              </Texto>
              <Texto>
                123456879
              </Texto>
            </View>
          </View>
          <Texto style={styles.sobreClienteLabel}>
            Nacionalidade
          </Texto>
          <Texto>
            Brasileiro
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Escolaridade
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Title style={styles.sobreClienteFinanceiroLabel}>
            Financeiro
          </Title>
          <Texto style={styles.sobreClienteLabel}>
            Declara imposto de renda
          </Texto>
          <Texto>
            Sim
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Tem compromisso financeiro no holerite?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Possui Restrição no nome ?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Tipo de Renda
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Mais de 1 mes de carteira assinada?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Renda brutal formal
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Renda brutal informal
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Recursos próprios
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Vai utilizar FGTS?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Mais de 3 anos de FGTS?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Imovel registrado no nome ?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <Texto style={styles.sobreClienteLabel}>
            Possui algum familiar ou amigo que possa complentar a renda?
          </Texto>
          <Texto>
            Faculdade
          </Texto>
          <View style={{ height: 10 }} />
          <Listinha nomeCorretor={'fdasda'} emailCorretor={'sexo'} status={'ativo'} />
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default SobreCliente;

const styles = StyleSheet.create({
  novo: {
    backgroundColor: '#fff',
    flex: 1
  },
  sobreClienteArea: {
    
    flex: 1, 
  },
  sobreClienteNome: {
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 16, 
    paddingTop: 16, 
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 16, 
  },
  sobreClienteLabel: {
    fontWeight: 'bold',
    marginVertical: 3
  },
  telefoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
  },
  telefoneItem: {
    flex: 1,
    paddingRight: 8,
  },
  sobreClienteFinanceiroLabel: {
    fontWeight: 'bold',
    marginTop: 15, 
    marginBottom: 7
  }
});