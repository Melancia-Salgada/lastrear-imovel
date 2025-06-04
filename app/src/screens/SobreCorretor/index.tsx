import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderMais from '../../components/HeaderMais'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

function SobreCorretor() {

  const router = useRouter()
  
  function handleClose() {
    router.back()
  }
  
  return (
    <SafeAreaView style={styles.novo}>
      
      <HeaderMais handleClickClose={handleClose} editar/>
    </SafeAreaView>
  )
}

export default SobreCorretor

const styles = StyleSheet.create({
  novo: {
    backgroundColor: '#fff',
    flex: 1
  }
})