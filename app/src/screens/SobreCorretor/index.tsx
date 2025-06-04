import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderMais from '../../components/HeaderMais'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Title from '../../components/Title'
import Texto from '../../components/Texto'

function SobreCorretor() {

  const router = useRouter()
  
  function handleClose() {
    router.back()
  }
  
  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} editar/>
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
    paddingHorizontal:16,
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
})