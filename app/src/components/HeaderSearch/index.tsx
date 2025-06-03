import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../Input'
import Botao from '../Botao'
import { Entypo, Octicons } from '@expo/vector-icons'

interface HeaderSearchProps {
  criar?: boolean
  handleClickCriar?: () => void
  handleClickFiltro?: () => void
  valor: string
  onChange: (texto: string) => void
}

function HeaderSearch({criar, handleClickCriar,handleClickFiltro, onChange, valor}:HeaderSearchProps) {


  return (
    <View style={styles.header}>
      <Input placeholder='Buscar' type='search' valor={valor} onChange={onChange}/>
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