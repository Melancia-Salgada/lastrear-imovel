import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import HeaderMais from '../../components/HeaderMais'
import Title from '../../components/Title'
import Input from '../../components/Input'

function Novo() {
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  const router = useRouter()

  function handleClose() {
    router.back()
  }

  function formatarDataNascimento(data: string) {
  const [dia, mes, ano] = data.split('/')
  return `${ano}-${mes}-${dia}`
}

async function handleCriar() {
  if (!nomeCompleto || !email || !telefone) {
    alert('Preencha os campos obrigatórios (*)')
    return
  }

  const payload = {
    nomeCompleto,
    email,
    telefone,
    cpf,
    dataNascimento: nascimento ? formatarDataNascimento(nascimento) : null,
    especialidade,
    username: email,
    password: '123456', 
    status: 'ATIVO',
    role: 'CORRETOR'
  }

  try {
    const response = await fetch('http://192.168.15.18:8080/corretores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro ao criar corretor:', errorData)
      alert('Erro ao criar corretor.')
      return
    }

    alert('Corretor criado com sucesso!')
    router.back()
  } catch (error) {
    console.error('Erro na requisição:', error)
    alert('Erro ao criar corretor.')
  }
}


  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0} 
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <Title style={styles.txtNovo}>Novo Corretor</Title>
          <View style={styles.container}>
            <Input label="Nome completo: *" valor={nomeCompleto} onChange={setNomeCompleto} />
            <Input label="Email: *" valor={email} onChange={setEmail} keyboardType="email-address" />
            <Input label="Telefone: *" valor={telefone} onChange={setTelefone} keyboardType="phone-pad" />
            <Input label="CPF:" valor={cpf} onChange={setCpf} keyboardType="numeric" />
            <Input label="Data de nascimento:" valor={nascimento} onChange={setNascimento} placeholder="DD/MM/AAAA" />
            <Input label="Especialidade:" valor={especialidade} onChange={setEspecialidade} />
          </View>
          <Pressable style={styles.botao} onPress={handleCriar}>
            <Title style={styles.txtBotao}>Criar</Title>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Novo

const styles = StyleSheet.create({
  novo: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  container: {
    gap: 8,
    marginTop: 16,
  },
  botao: {
    marginTop: 20,
    paddingVertical: 20,
    color: "#fff",
    backgroundColor: '#0D529D',
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 20
  },
  txtBotao:{
    fontWeight: '700',
    color: "#fff"
  },
  txtNovo:{
    fontWeight: '700'
  }
})
