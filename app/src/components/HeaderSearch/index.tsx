import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../Input'
import Botao from '../Botao'
import { Entypo, Octicons } from '@expo/vector-icons'

interface HeaderSearchProps {
  criar?: boolean
  handleClickCriar?: () => void
  handleClickFiltro?: () => void
}

function HeaderSearch({criar, handleClickCriar,handleClickFiltro}:HeaderSearchProps) {
  return (
    <View style={styles.header}>
      <Input placeholder='Buscar' type='search'/>
      <Botao type='quadrado' handleClick={handleClickFiltro}>
        <Octicons name='filter' size={36} color={'#8D8D8D'}/>
      </Botao>
      {criar && 
        <Botao type='redondo' handleClick={handleClickCriar}>
          <Entypo name='plus' size={36} color={'#FFF'}/>
        </Botao>
      }
    </View>
  )
}

export default HeaderSearch

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  }
})