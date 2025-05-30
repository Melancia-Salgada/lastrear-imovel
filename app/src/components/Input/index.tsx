import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'


interface InputProps {
  placeholder?: string
  type?: string
}

function Input({placeholder, type}: InputProps) {

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
      />
      {type === 'search' && <Feather style={styles.lupa} name='search' size={32} color={'#8D8D8D'}/>}
      
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
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  lupa:{
    position:'absolute',
    right: 20,
  }

})