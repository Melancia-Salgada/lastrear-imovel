import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import HeaderMais from "@/app/src/components/HeaderMais";
import Title from "@/app/src/components/Title";
import Input from "@/app/src/components/Input";
import DropdownSimNao from "@/app/src/components/DropdownSimNao";
import DropdownRenda from "@/app/src/components/DropdownRenda";
import { Alert } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import DropdownHolerite from "@/app/src/components/DropDownHolerite";
import DropdownStatusCliente, { StatusCliente } from "@/app/src/components/DropdownStatusCliente";

function ClienteEdit() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id')?? "";

  function normalizeParam(param: string | string[] | undefined): string {
    if (Array.isArray(param)) return param[0];
    return param || "";
  }

  function getParam(param: string | string[] | undefined): string {
    return Array.isArray(param) ? param[0] : param || "";
  }


  const [nomeCompleto, setNomeCompleto] = useState(normalizeParam(params.nome));
  const [procura, setProcura] = useState(normalizeParam(params.procura));
  const [tipoImovel, setTipoImovel] = useState(
    normalizeParam(params.tipoImovel)
  );
  const [email, setEmail] = useState(normalizeParam(params.email));
  const [telefone1, setTelefone1] = useState(normalizeParam(params.telefone1));
  const [telefone2, setTelefone2] = useState(normalizeParam(params.telefone2));
  const [cpf, setCpf] = useState(normalizeParam(params.cpf));
  const [nascimento, setNascimento] = useState(
    normalizeParam(params.dataNascimento || params.nascimento)
  );
  const [estadoCivil, setEstadoCivil] = useState(
    normalizeParam(params.estadoCivil)
  );
  const [nacionalidade, setNacionalidade] = useState(
    normalizeParam(params.nacionalidade)
  );
  const [escolaridade, setEscolaridade] = useState(
    normalizeParam(params.escolaridade)
  );

  const [imposto, setImposto] = useState(normalizeParam(params.imposto));
  const [holerite, setHolerite] = useState(normalizeParam(params.holerite));
  const [restricao, setRestricao] = useState(normalizeParam(params.restricao));
  const [valorRestricao, setValorRestricao] = useState(
    normalizeParam(params.valorRestricao)
  );
  const [tipoRenda, setTipoRenda] = useState(normalizeParam(params.tipoRenda));
  const [rendaFormal, setRendaFormal] = useState(
    normalizeParam(params.rendaFormal)
  );
  const [rendaInformal, setRendaInformal] = useState(
    normalizeParam(params.rendaInformal)
  );
  const [tempoCarteira, setTempoCarteira] = useState(
    normalizeParam(params.tempoCarteira)
  );
  const [usarFgts, setUsarFgts] = useState(normalizeParam(params.usarFgts));
  const [anoFgts, setAnoFgts] = useState(normalizeParam(params.anoFgts));
  const [imovelNome, setImovelNome] = useState(
    normalizeParam(params.imovelNome)
  );
  const [segundoParticipante, setSegundoParticipante] = useState(
    normalizeParam(params.segundoParticipante)
  );

  function validarStatusCliente(status: string): StatusCliente | "" {
  if (
    status === "ANDAMENTO" ||
    status === "ABERTO" ||
    status === "ENCERRADO" ||
    status === "CONCLUIDO"
  ) {
    return status;
  }
  return "";
}

// Uso do hook com validação:
const [status, setStatus] = useState<StatusCliente | "">(
  validarStatusCliente(getParam(params.status))
);



  function handleClose() {
    router.back();
  }

  async function handleEditarCliente() {
  if (!nomeCompleto || !procura || !tipoImovel || !email || !telefone1 || !cpf) {
    Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
    return;
  }

  function checarVariavel(valor: string) {
    if (valor === 'Sim') return true
    if (valor === 'Não') return false
    return valor
  }

  const clienteAtualizado = {
  estadoRegistro: status,
  procura,
  tipo: tipoImovel, // Aqui você deve confirmar se `tipoImovel` corresponde ao "tipo" do imóvel.
  segundoParticipante: segundoParticipante === 'true', // ou true, dependendo do seu caso
  participante1: {
    status,
    nome: nomeCompleto,
    cpf,
    email,
    telefone1,
    telefone2,
    dataNascimento: nascimento,
    estadoCivil,
    restricaoNoNome: checarVariavel(restricao),
    valorRestricao: parseFloat(valorRestricao.replace(/[^\d,]/g, "").replace(",", ".")) || 0,
    tipoDeRenda: tipoRenda.toUpperCase(),
    umMesDeCarteiraAssinada: checarVariavel(tempoCarteira),
    rendaBrutaFormal: parseFloat(rendaFormal) || 0,
    rendaBrutaInformal: parseFloat(rendaInformal) || 0,
    tresAnosFgts: checarVariavel(anoFgts),
    vaiUtilizarFgts: checarVariavel(usarFgts),
    declaraIRPF: checarVariavel(imposto),
    compromissoHolerite: typeof holerite === 'string'
    ? holerite.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    : '',
    possuiImovelRegistradoNoNome: checarVariavel(imovelNome)
  }
};


  try {
    const response = await fetch(`http://192.168.15.10:8080/registros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteAtualizado),
    });

    if (response.ok) {
      Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
      router.back(); // Volta para a tela anterior
    } else {
      const errorData = await response.json();
      Alert.alert("Erro", errorData?.mensagem || "Erro ao atualizar o cliente.");
    }
  } catch (error) {
    Alert.alert("Erro", "Erro de conexão com o servidor.");
    console.error("Erro ao editar cliente:", error);
  }
}

  return (
    <SafeAreaView style={styles.novo}>
      <HeaderMais handleClickClose={handleClose} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Title style={styles.txtNovo}>Editar Cliente</Title>
        

          <View style={styles.container}>
            <DropdownStatusCliente
            label="Status:"
            valor={status}
            onChange={setStatus}
            />
            <Input
              label="Nome completo: *"
              valor={nomeCompleto}
              onChange={setNomeCompleto}
            />
            <Input label="Procura: *" valor={procura} onChange={setProcura} />
            <Input
              label="Tipo do Imóvel: *"
              valor={tipoImovel}
              onChange={setTipoImovel}
            />
            <Input
              label="Email: *"
              valor={email}
              onChange={setEmail}
              keyboardType="email-address"
            />
            <Input
              label="Telefone 1: *"
              valor={telefone1}
              onChange={setTelefone1}
              keyboardType="phone-pad"
            />
            <Input
              label="Telefone 2:"
              valor={telefone2}
              onChange={setTelefone2}
              keyboardType="phone-pad"
            />
            <Input
              label="CPF: *"
              valor={cpf}
              onChange={setCpf}
              keyboardType="numeric"
            />
            <Input
              label="Data de nascimento:"
              valor={nascimento}
              onChange={setNascimento}
              placeholder="DD/MM/AAAA"
            />
            <Input
              label="Estado Civil:"
              valor={estadoCivil}
              onChange={setEstadoCivil}
            />
            <Input
              label="Nacionalidade:"
              valor={nacionalidade}
              onChange={setNacionalidade}
            />
            <Input
              label="Escolaridade:"
              valor={escolaridade}
              onChange={setEscolaridade}
            />

            <Title style={{ marginTop: 20, fontWeight: "700" }}>
              Financeiro
            </Title>

            <DropdownSimNao
              label="Declara imposto de renda:"
              valor={imposto}
              onChange={setImposto}
            />

            <DropdownHolerite
              label="Tem compromisso financeiro no holerite?"
              valor={holerite}
              onChange={setHolerite}
            />
            <DropdownSimNao
              label="Possui restrição no nome?"
              valor={restricao}
              onChange={setRestricao}
            />
            <Input
              label="Valor da restrição:"
              valor={valorRestricao}
              onChange={setValorRestricao}
              placeholder="Ex: R$ 1.200,00"
            />
            <DropdownRenda
              label="Tipo de renda:"
              valor={tipoRenda}
              onChange={setTipoRenda}
            />
            <Input
              label="Renda bruta formal:"
              valor={rendaFormal}
              onChange={setRendaFormal}
            />
            <Input
              label="Renda bruta informal:"
              valor={rendaInformal}
              onChange={setRendaInformal}
            />
            <DropdownSimNao
              label="Mais de 1 mês de carteira assinada?"
              valor={tempoCarteira}
              onChange={setTempoCarteira}
            />
            <DropdownSimNao
              label="Vai utilizar FGTS?"
              valor={usarFgts}
              onChange={setUsarFgts}
            />
            <DropdownSimNao
              label="Mais de 3 anos de FGTS?"
              valor={anoFgts}
              onChange={setAnoFgts}
            />
            <DropdownSimNao
              label="Imóvel registrado no nome?"
              valor={imovelNome}
              onChange={setImovelNome}
            />
          </View>

          <Pressable style={styles.botao} onPress={handleEditarCliente}>
            <Title style={styles.txtBotao}>Editar</Title>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ClienteEdit;

const styles = StyleSheet.create({
  novo: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#0D529D",
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 20,
  },
  txtBotao: {
    fontWeight: "700",
    color: "#fff",
  },
  txtNovo: {
    fontWeight: "700",
  },
});
