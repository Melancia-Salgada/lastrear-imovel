import React, { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface BotaoProps {
  children: ReactNode;
  handleClick?: () => void;
  type?: 'quadrado' | 'redondo';
}

function Botao({ children, handleClick, type }: BotaoProps) {
  function checkType() {
    switch (type) {
      case 'quadrado':
        return styles.quadrado;
      case 'redondo':
        return styles.redondo;
      default:
        return;
    }
  }

  return (
    <Pressable onPress={handleClick} style={[styles.botao,checkType()]}>
      {children}
    </Pressable>
  );
}

export default Botao;

const styles = StyleSheet.create({
  botao: {
    display: 'flex',
    alignSelf: 'flex-start'
  },
  quadrado: {
    padding: 11,
    backgroundColor: '#EFEFEF',
    borderRadius: 12
  },
  redondo: {
    backgroundColor: '#1B87C8',
    padding: 12,
    borderRadius: 50
  },
});
