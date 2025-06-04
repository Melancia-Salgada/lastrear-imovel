import React from 'react'
import { StyleSheet, TextInput, View, KeyboardTypeOptions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Texto from '../Texto'

interface InputProps {
  placeholder?: string
  type?: string
  valor: string
  onChange: (text: string) => void
  label?: string
  keyboardType?: KeyboardTypeOptions // <- Adicionado aqui
}

function Input({ placeholder, type, valor, onChange, label, keyboardType }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Texto>{label}</Texto>}
      <TextInput
        value={valor}
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.input}
        keyboardType={keyboardType} // <- Aplicado aqui
      />
      {type === 'search' && (
        <Feather style={styles.lupa} name="search" size={32} color="#8D8D8D" />
      )}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    height: 58,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 60,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  lupa: {
    position: 'absolute',
    right: 20,
  },
})
