import Listinha from '@/app/src/components/ListinhaCliente'
import TemplateNavScreen from '@/app/src/components/TemplateNavScreen'
import Title from '@/app/src/components/Title'
import { IClienteLista } from '@/app/src/interfaces/IClienteLista'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet } from 'react-native'

function CorretorHome() {
  const router = useRouter()

  const [clientesAtuais, setClientesAtuais] = useState<IClienteLista[]>([])

  useEffect(() => {
    const mockClientes: IClienteLista[] = [
      { nome: 'Lucas', tipoImovel: 'Apartamento', corretor: 'Eduardo', estado: 'andamento' },
      { nome: 'Beatriz', tipoImovel: 'Casa', corretor: 'Eduardo', estado: 'aberto' },
      { nome: 'Mateus', tipoImovel: 'Cobertura', corretor: 'Eduardo', estado: 'encerrado' },
      { nome: 'Juliana', tipoImovel: 'Apartamento', corretor: 'Eduardo', estado: 'aberto' },
    ]
    setClientesAtuais(mockClientes)
  }, [])

  const handleClienteOpen = () => {
    router.push("/src/screens/SobreCliente");
  };

  return (
    <TemplateNavScreen label='Olá, Eduardo!' sublabel='Espero que tenha um ótimo dia.'>
      <Title style={styles.bold}>Seus clientes</Title>
      <ScrollView style={styles.clientesContainer} showsVerticalScrollIndicator={false}>
        {clientesAtuais.map((item, index) => (
          <Pressable onPress={handleClienteOpen} key={index}>
            <Listinha
              nomeCliente={item.nome}
              tipoImovel={item.tipoImovel}
              nomeCorretor={item.corretor}
              estadoNegocio={item.estado}
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
    fontWeight: "700",
  },
  clientesContainer: {
    marginTop: 10,
    paddingBottom: 60,
  },
});
