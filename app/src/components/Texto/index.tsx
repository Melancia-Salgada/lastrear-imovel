import React, { ReactNode } from 'react'
import { StyleSheet, Text, TextStyle, StyleProp } from 'react-native'

interface TextoProp {
  children: ReactNode,
  style?: StyleProp<TextStyle>
}

function Texto({ children, style }: TextoProp) {
  return (
    <Text style={[styles.texto, style]}>{children}</Text>
  )
}

export default Texto

const styles = StyleSheet.create({
  texto: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  }
})
