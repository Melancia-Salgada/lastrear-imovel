import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import HeaderMais from '../../components/HeaderMais'
import { StyleSheet } from 'react-native'


function Novo() {

  
  
  const router = useRouter()

  function handleClose() {
    router.back()
  }


  return (
    <SafeAreaView style={styles.novo}>
      
      <HeaderMais handleClickClose={handleClose}/>
    </SafeAreaView>
  )
}

export default Novo

const styles = StyleSheet.create({
  novo: {
    backgroundColor: '#fff',
    flex: 1
  }
})

