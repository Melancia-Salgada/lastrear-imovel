import React, { ReactNode } from 'react'
import { StyleSheet, Text, TextStyle, StyleProp } from 'react-native'

interface TitleProp {
  children: ReactNode,
  style?: StyleProp<TextStyle>
}

function Title({ children, style }: TitleProp) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
  }
})
