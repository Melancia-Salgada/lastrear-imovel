// /app/blank.tsx
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Texto from '../../components/Texto';
import Title from '../../components/Title';



  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


  export default function Login() {

    const [senha, setSenha] = useState(''); 
    const [email, setEmail] = useState(''); 

  return (
    <View style={styles.container}>
      <View style={styles.blocoAzul}/>
      <Image source={require('../../../../assets/images/icon.png')} style={styles.LogoLastrear} />
      <View style={styles.conteudo}>
          <Title style={styles.txt1}>
            Login
          </Title>
          <Texto style={styles.subtitulo}>
            Entre com a sua conta para continuar
          </Texto>

          <Texto style={styles.label}>
          Email
          </Texto>
          <TextInput style={styles.input}
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address" 
          autoCapitalize="none"
          />

          <Texto style={styles.label}>
          Senha
          </Texto>
          <TextInput style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={text => setSenha(text)}
          secureTextEntry={true}
          autoCapitalize="none"
          />
        
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha? </Text>
        <TouchableOpacity onPress={() => {
          // Adicione aqui a lógica para recuperar a senha
          console.log('Recuperar senha pressionado');
        }}>
          <Texto style={styles.label}>Recuperar</Texto>
        </TouchableOpacity>
         
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor:'#0D559F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blocoAzul:{
    flex:1,
    backgroundColor:'#0D559F',
    width: windowHeight * 0.5
  },
  conteudo:{
    flex: 3,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:'white',
    width: windowHeight * 0.47,
    paddingTop: windowHeight * 0.18 ,
    paddingHorizontal: windowWidth * 0.15
  },
  LogoLastrear:{
    position: 'absolute',
    zIndex: 2,
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    top:windowHeight * 0.14,
    left:windowWidth * 0.29
  },
  txt1:{
    fontSize:40,
    fontWeight: 'bold',
  },
  subtitulo:{
    paddingBottom:20,
  },
  label:{
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01
  },
  input:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.06,
    backgroundColor: '#EFEFEF',
    borderRadius: 14,
    paddingHorizontal:windowWidth * 0.04,
    marginBottom: windowHeight * 0.05,
  },
  button: {
    backgroundColor: '#0D559F', 
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25, 
    marginBottom: 10, 
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    flexDirection: 'row', 
    justifyContent:'center'
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#333', 
  },
  recoverPasswordText: {
    fontSize: 16,
    color: '#0D559F', 
    fontWeight: 'bold',
  }
});
