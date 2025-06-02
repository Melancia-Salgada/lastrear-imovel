import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'

import Texto from '@/app/src/components/Texto'
import { Ionicons } from '@expo/vector-icons'
import { Text } from '@react-navigation/elements'
import React, { useState } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Dimensions, Modal, Pressable } from 'react-native'
import Listinha from '@/app/src/components/nseinome'
import { Image } from 'react-native'




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Clientes() {

 
 const [modalVisible, setModalVisible] = useState(false);

 // Função para abrir o modal
 const handleOpenModal = () => {
   setModalVisible(true);
   console.log('Modal aberto');
 };

 // Função para fechar o modal
 const handleCloseModal = () => {
   setModalVisible(false);
   console.log('Modal fechado');
 };

  return (
    <TemplateNavScreen label='Clientes'>
        <View style={styles.areaBusca}>
          <View style={styles.campoBusca}>
            <Ionicons name='search'/>
            <TextInput 
              style={styles.inputBusca}
              placeholder=''
            />
          </View>
          <TouchableOpacity style={styles.botaoFiltro} onPress={handleOpenModal}>
          <Ionicons name='filter' color={'#8d8d8d'} size={30}/>
          </TouchableOpacity>
        </View>
      <Listinha nomeCliente={''} tipoImovel={''} nomeCorretor={''} estadoNegocio={''}/>
      <Listinha nomeCliente={''} tipoImovel={''} nomeCorretor={''} estadoNegocio={''}/>
      <Listinha nomeCliente={''} tipoImovel={''} nomeCorretor={''} estadoNegocio={''}/>
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
      >
         <Pressable 
          style={styles.centeredView} 
          onPress={handleCloseModal} 
        >
          <Pressable 
            style={styles.modalView}
            onPress={(event) => event.stopPropagation()} 
          >
            <Texto>Matheus Vital, com fé no pé</Texto>
            <Image
            style={styles.stretch}
            source={require('@/assets/images/comfenope.jpg')}/> 
          </Pressable>
        </Pressable>
      </Modal>
    </TemplateNavScreen>
  )
}

export default Clientes

const styles= StyleSheet.create({
areaBusca:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom:windowHeight * 0.03
},
campoBusca:{
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center',
  backgroundColor:"#efefef",
  width:windowWidth * 0.75,
  height:windowHeight * 0.07,
  borderRadius:windowHeight * 0.01,
  paddingHorizontal:windowWidth * 0.03
},
inputBusca:{
  width: '100%',
  height: 70,
  fontSize:20
},
botaoFiltro:{
  backgroundColor:'#efefef',
  width:windowWidth * 0.13,
  height:windowHeight * 0.07,
  borderRadius:windowHeight * 0.01,
  justifyContent:'center',
  alignItems:'center'
},
centeredView: {
  flex: 1,
  justifyContent: 'flex-end', 
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
modalView: {
  backgroundColor: 'white',
  width: '100%', 
  height: windowHeight * 0.6, 
  borderTopLeftRadius: 20, 
  borderTopRightRadius: 20,
  padding: 25, 
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -2, 
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
stretch: {
  width: 400,
  height: 200,
  resizeMode: 'stretch',
},
})