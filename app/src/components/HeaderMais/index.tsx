import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Botao from "../Botao";
import { Foundation, Ionicons } from "@expo/vector-icons";

interface HeaderMaisProps {
  handleClickClose?: () => void
  handleClickEdit?: () => void
  editar?: boolean
}

function HeaderMais({handleClickClose,handleClickEdit, editar}: HeaderMaisProps) {
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.headerContainer}>
        <Botao handleClick={handleClickClose}>
          <Ionicons name="close" size={36} color={"#ADADAD"} />
        </Botao>
        {editar &&
          <Botao handleClick={handleClickEdit}>
            <Foundation name="pencil" size={32} color={"#ADADAD"} />
          </Botao>
        }
      </View>
    </View>
  );
}

export default HeaderMais;

const styles = StyleSheet.create({
  headerContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ADADAD',
    padding: 12,
    alignItems: 'center'
  }
})