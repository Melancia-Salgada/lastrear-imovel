import Listinha from '@/app/src/components/ListinhaCliente'
import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import Title from '@/app/src/components/Title'
import { IClienteLista } from '@/app/src/interfaces/IClienteLista'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet } from 'react-native'

function CorretorHome() {
  const router = useRouter()
  const [clientesAtuais, setClientesAtuais] = useState<IClienteLista[]>([])

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://192.168.15.10:8080/registros')
      const data = await response.json()

      const adaptado: IClienteLista[] = data.map((registro: any) => ({
        id: registro.id || crypto.randomUUID(),
        nome: registro.participante1?.nome || 'Sem nome',
        tipoImovel: (registro.procura || 'Desconhecido').toLowerCase(),
        estadoImovel: (registro.tipo || 'Desconhecido').toLowerCase(),
        status: (registro.participante1?.status || 'aberto').toLowerCase(),
        corretor: 'Desconhecido', // Pode ser adaptado conforme seu dado
      })).reverse()

      setClientesAtuais(adaptado.slice(0, 5))
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchClientes()
    }, [])
  )

  const handleClienteOpen = (id: string) => {
    router.push({ pathname: '/src/screens/SobreCliente', params: { id } })
  }

  return (
    <TemplateNavScreen label='Olá, Eduardo!' sublabel='Espero que tenha um ótimo dia.'>
      <Title style={styles.bold}>Seus clientes</Title>
      <ScrollView style={styles.clientesContainer} showsVerticalScrollIndicator={false}>
        {clientesAtuais.map((item) => (
          <Pressable onPress={() => handleClienteOpen(item.id)} key={item.id}>
            <Listinha
              nomeCliente={item.nome}
              tipoImovel={item.tipoImovel}
              nomeCorretor={item.corretor}
              status={item.status}
              estadoImovel={item.estadoImovel}
            />
          </Pressable>
        ))}
      </ScrollView>
    </TemplateNavScreen>
  )
}

export default CorretorHome

const styles = StyleSheet.create({
  bold: {
    fontWeight: '700',
  },
  clientesContainer: {
    marginTop: 10,
    paddingBottom: 60,
  },
})
