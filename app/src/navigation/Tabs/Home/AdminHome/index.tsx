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
      {
        nome: "João",
        tipoImovel: "Apartamento",
        corretor: "Maria",
        estado: "andamento",
      },
      { nome: "Ana", tipoImovel: "Casa", corretor: "Carlos", estado: "aberto" },
      {
        nome: "Bruno",
        tipoImovel: "Casa",
        corretor: "Carlos",
        estado: "encerrado",
      },
      {
        nome: "Mariana",
        tipoImovel: "Casa",
        corretor: "Carlos",
        estado: "aberto",
      },
      {
        nome: "Fernanda",
        tipoImovel: "Apartamento",
        corretor: "Carlos",
        estado: "andamento",
      },
    ];
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
        estadoNegocio={item.estado}
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
