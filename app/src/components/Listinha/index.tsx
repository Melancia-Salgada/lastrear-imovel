import React, { ReactNode } from 'react'
import { Dimensions, SafeAreaView, StyleSheet,  View } from 'react-native'
import Title from '../Title'
import Texto from '../Texto'

interface ListinhaProps {
    nomeCliente: string;
    tipoImovel: string;
    nomeCorretor: string;
    estadoNegocio: string; 

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Listinha({ 
    nomeCliente, 
    tipoImovel, 
    nomeCorretor, 
    estadoNegocio 
}: ListinhaProps){
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
                <View style={styles.estado}>
                    <Texto>Em andamento</Texto>
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
        maxWidth: 317
    },
    cliente:{
        flexDirection:'column',
        padding:0,
        marginBottom: windowHeight * 0.03,
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
        backgroundColor: '#cecece',
        padding: 6,
        borderWidth:1 ,
        borderColor:'#9C9797'
    }
})