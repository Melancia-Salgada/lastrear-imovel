import React, { ReactNode } from 'react'
import { Dimensions, SafeAreaView, StyleSheet,  Text,  View } from 'react-native'
import Title from '../Title'
import Texto from '../Texto'

interface ListinhaProps {
    nomeCliente: string;
    tipoImovel: string;
    nomeCorretor: string;
    estadoNegocio: 'andamento' | 'aberto' | 'encerrado' | 'concluido'; 

}

export default function Listinha({ 
    nomeCliente, 
    tipoImovel, 
    nomeCorretor, 
    estadoNegocio 
}: ListinhaProps){

    let txt = ''

    function checkStatus() {
        switch (estadoNegocio) {
            case 'andamento':
                txt='Em andamento'
                return styles.andamento
            case 'aberto':
                txt='Em aberto'
                return styles.aberto
            case 'encerrado':
                txt='Encerrado'
                return styles.encerrado
            case 'concluido':
                txt='Concluído'
                return styles.concluido
            default:
                break;
        }
    }

    return(
        <View style={styles.caixa}>
            <View style={styles.cliente}>
                <Title style={{fontWeight:'bold'}}>{nomeCliente}</Title>
                <Texto>apartamento - novo</Texto>
            </View>      
            <View style={styles.corretor}>
                <Texto>
                Carlos Nobrega
                </Texto>
                <View style={[styles.estado, checkStatus()]}>
                    <Texto>{txt}</Texto>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    caixa:{
        flexDirection:'column',
        backgroundColor:'#efefef',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom:12,
    },
    cliente:{
        flexDirection:'column',
        padding:0,
        marginBottom: 20,
    },
    corretor:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    estado:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth:1 ,
    },
    andamento: {
        backgroundColor: '#cecece',
        borderColor:'#9C9797'
    },
    aberto: {
        backgroundColor: '#B9D9B7',
        borderColor:'#6C8664'
    },
    encerrado: {
        backgroundColor: '#FFA3A3',
        borderColor:'#8F3535'
    },
    concluido: {
        backgroundColor: '#87C0FF',
        borderColor:'#46358F'
    },

})