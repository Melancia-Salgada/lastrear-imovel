// /app/blank.tsx
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Texto from "../../components/Texto";
import Title from "../../components/Title";
import { useRouter } from "expo-router";



export default function Login() {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleEntrar() {
    router.push('/'); 
  }

  return (
    <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0} 
          >
            <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ flexGrow: 1 }}
  keyboardShouldPersistTaps="handled" 
>

    <View style={styles.container}>
      <View style={styles.blocoAzul} />
      
      <View style={styles.conteudo}>
        <Image
        source={require("../../../../assets/images/icon.png")}
        style={styles.LogoLastrear}
        />
        <Title style={styles.txt1}>Login</Title>
        <Texto style={styles.subtitulo}>
          Entre com a sua conta para continuar
        </Texto>

        <View style={styles.inputContainer}>
          <View>
            <Texto style={styles.label}>Email</Texto>
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View>
            <Texto style={styles.label}>Senha</Texto>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={(text) => setSenha(text)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
        </View>
        
        <Pressable >
            <TouchableOpacity onPress={handleEntrar} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Pressable>
        
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha? </Text>
          <TouchableOpacity
            onPress={() => {
              console.log("Recuperar senha pressionado");
            }}
          >
            <Texto style={styles.labelRec}>Recuperar</Texto>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0D559F",
    justifyContent: "center",
    alignItems: "center",
  },
  blocoAzul: {
    flex: 1,
    backgroundColor: "#0D559F",
    height: 160
  },
  conteudo: {
    flex: 3,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 111,
    paddingHorizontal: 48,
  },

  LogoLastrear: {
    position: "absolute",
    zIndex: 2,
    width: 126,
    height: 125.4,
    top: -51,
    alignSelf: "center",
  },
  txt1: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitulo: {
    paddingBottom: 20,
    fontSize: 14,
  },
  label: {
    fontWeight: "bold",
  },
  labelRec: {
    fontWeight: "bold",
    color: "#0D529D",
  },
  input: {
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    height: 58,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 60,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#0D559F",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#333",
  },
  recoverPasswordText: {
    fontSize: 16,
    color: "#0D559F",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "column",
    gap: 28,
  },
  forgotPasswordContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
