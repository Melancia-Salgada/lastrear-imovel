import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import { Button, Text } from '@react-navigation/elements'
import { useRouter } from 'expo-router'
import React from 'react'

function Home() {

  const router = useRouter()

  function handleClick() {
    router.push('/src/screens/Login')
  }

  return (
    <TemplateNavScreen label='Olá, Eduardo!' sublabel='Espero que tenha um ótimo dia.'>
      <Text>aaa</Text>
      <Button onPressOut={handleClick}>Abrir tela de Componente</Button>
    </TemplateNavScreen>
  )
}

export default Home