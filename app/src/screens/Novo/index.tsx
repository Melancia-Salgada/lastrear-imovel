import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import HeaderMais from '../../components/HeaderMais'


function Novo() {

  
  
  const router = useRouter()

  function handleClose() {
    router.back()
  }


  return (
    <SafeAreaView>
      
      <HeaderMais handleClickClose={handleClose}/>
    </SafeAreaView>
  )
}

export default Novo

