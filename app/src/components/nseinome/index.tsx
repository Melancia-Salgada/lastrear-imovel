import React, { ReactNode } from 'react'
import { Dimensions, SafeAreaView, StyleSheet,  View } from 'react-native'
import Title from '../Title'
import Texto from '../Texto'
import Clientes from '../../navigation/Tabs/Clientes';
import Corretores from '../../navigation/Tabs/Corretores';

interface TemplateClienteCorretorProps {
    nomeCliente: string;
    tipoImovel: string;
    nomeCorretor: string;
    estadoNegocio: string; 

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TemplateClienteCorretor({ 
    nomeCliente, 
    tipoImovel, 
    nomeCorretor, 
    estadoNegocio 
}: TemplateClienteCorretorProps){
    return(
        <View style={styles.caixa}>
            <View style={styles.cliente}>
                <Title style={{fontWeight:'bold'}}>Gabriel Almeida</Title>
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
        width:windowWidth * 0.8,
        height:windowHeight * 0.14,
        paddingHorizontal: windowWidth * 0.06,
        paddingVertical: windowHeight * 0.01,
        borderRadius: 12,
        padding: 0
    },
    cliente:{
        flexDirection:'column',
        padding:0,
        marginBottom: windowHeight * 0.03,
    },
    corretor:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    estado:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 12,
        backgroundColor: '#cecece',
        width:windowWidth * 0.34,
        height:windowHeight * 0.03,
        paddingHorizontal:windowWidth * 0.04,
        borderWidth:windowWidth * 0.005 ,
        borderColor:'#9C9797'
    }
})