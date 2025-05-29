import React from 'react'
import { Text } from '@react-navigation/elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import TemplateNavScreen from '@/src/components/TemplateNavScreen'

function Home() {
  return (
    <TemplateNavScreen label='Olá, Eduardo!' sublabel='Espero que tenha um ótimo dia.'>
      <Text>aaa</Text>
    </TemplateNavScreen>
  )
}

export default Home