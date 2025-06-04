import Listinha from "@/app/src/components/ListinhaCliente";
import TemplateNavScreen from "@/app/src/components/TemplateNavScreen";
import Title from "@/app/src/components/Title";
import { IClienteLista } from "@/app/src/interfaces/IClienteLista";
import { Button, Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

function AdminHome() {
  const router = useRouter();

  const [clientesRecentes, setClientesRecentes] = useState<IClienteLista[]>([]);

  useEffect(() => {
    const mockClientes: IClienteLista[] = [
  { nome: "João", tipoImovel: "Apartamento", corretor: "Maria", status: "andamento", estadoImovel: "Novo" },
  { nome: "Ana", tipoImovel: "Casa", corretor: "Carlos", status: "aberto", estadoImovel: "Usado" },
  { nome: "Bruno", tipoImovel: "Casa", corretor: "Carlos", status: "encerrado", estadoImovel: "Novo" },
  { nome: "Mariana", tipoImovel: "Casa", corretor: "Carlos", status: "aberto", estadoImovel: "Usado" },
  { nome: "Fernanda", tipoImovel: "Apartamento", corretor: "Carlos", status: "concluido", estadoImovel: "Novo" },
]

    setClientesRecentes(mockClientes);
  }, []);

  const handleClienteOpen = () => {
    router.push("/src/screens/SobreCliente");
  };

  return (
    <TemplateNavScreen
      label="Olá, Eduardo!"
      sublabel="Espero que tenha um ótimo dia."
    >
      <Title style={styles.bold}>Clientes Recentes</Title>
      <ScrollView style={styles.clientesContainer} showsVerticalScrollIndicator={false}>
  {clientesRecentes.map((item, index) => (
    <Pressable onPress={handleClienteOpen} key={index}>
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
  );
}

export default AdminHome;

const styles = StyleSheet.create({
  bold: {
    fontWeight: "700",
  },
  clientesContainer: {
    marginTop: 10,
    paddingBottom: 60,
  },
});
