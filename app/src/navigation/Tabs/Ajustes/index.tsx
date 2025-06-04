import Botao from '@/app/src/components/Botao'
import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import { Text } from '@react-navigation/elements'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import Title from '@/app/src/components/Title'
import Texto from '@/app/src/components/Texto'

function Ajustes() {
  return (
    <TemplateNavScreen label=' Ajustes'>
      <View style={styles.container}>
        <Pressable style={[styles.buttonContainer, styles.cinza]}>
          <FontAwesome6 name='lock' size={32}/>
          <Title>Alterar senha</Title>
        </Pressable>
        <Pressable style={[styles.buttonContainer, styles.vermelho]}>
          <FontAwesome6 name='door-closed'size={32}/>
          <Title>Sair</Title>
        </Pressable>
      </View>
    </TemplateNavScreen>
  )
}


export default  Ajustes

const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems:'center' ,
    justifyContent: 'center',
    gap:12
    
  },
  container:{
    flexDirection: 'column',
    gap: 20
  },
  vermelho: {
    backgroundColor:'#FFA3A3',
    borderColor: '#8F3535',
    borderWidth: 1
  },
  cinza: {
    backgroundColor:'#CECECE',
    borderColor: '#9C9797',
    borderWidth: 1
  },
})