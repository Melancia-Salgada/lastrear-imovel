import React, { ReactNode } from 'react'
import { SafeAreaView, StyleSheet,  View } from 'react-native'
import Title from '../Title'
import Texto from '../Texto'

interface TemplateNavScreenProps {
  children: ReactNode,
  label:string,
  sublabel?:string 
}

function TemplateNavScreen({children, label, sublabel}: TemplateNavScreenProps) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={[styles.titleContainer, { marginBottom: sublabel ? 24 : 12 }]}>
        <Title style={styles.label}>{label}</Title>
        {sublabel && <Texto style={styles.sublabel}>{sublabel}</Texto>}
      </View>
      
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default TemplateNavScreen

const styles = StyleSheet.create ({
  background: {
    backgroundColor: '#0D529D',
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 28,
    paddingHorizontal: 12
  },
  label: {
    fontSize: 36,
    fontFamily: 'Poppins_600SemiBold', 
    color: '#fff',
  },
  sublabel: {
    color: '#fff',
    marginTop: -8
  },
  titleContainer: {
    marginLeft: 12,
    marginTop: 40,
    marginBottom: 12
  }
});
