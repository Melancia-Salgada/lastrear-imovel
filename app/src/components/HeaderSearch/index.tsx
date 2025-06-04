import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Input from '../Input'
import Botao from '../Botao'
import { Entypo, Octicons } from '@expo/vector-icons'

interface HeaderSearchProps {
  valor: string;
  onChange: (text: string) => void;
  criar?: boolean;
  handleClickCriar?: () => void;
  handleClickFiltro?: () => void;
  filtroAtivo?: boolean; // 👈 nova prop
}

function HeaderSearch({criar, handleClickCriar,handleClickFiltro, onChange, valor,filtroAtivo}:HeaderSearchProps) {


  return (
    <View style={styles.header}>
      <Input placeholder='Buscar' type='search' valor={valor} onChange={onChange}/>
      <Botao type='quadrado' handleClick={handleClickFiltro}>
        <Octicons name='filter' size={36} color={'#8D8D8D'}/>
        {filtroAtivo &&
        <View style={styles.filtroAtivo}/>}
        
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
  },
  filtroAtivo: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 25,
    backgroundColor: "red",
  }
})