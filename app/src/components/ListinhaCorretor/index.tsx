import React, { ReactNode } from 'react'
import { Dimensions, SafeAreaView, StyleSheet,  Text,  View } from 'react-native'
import Title from '../Title'
import Texto from '../Texto'

interface ListinhaProps {
    nomeCorretor: string;
    emailCorretor: string;
    status: 'ativo' | 'inativo'; 

}

export default function Listinha({ 
    nomeCorretor, 
    emailCorretor, 
    status 
}: ListinhaProps){

    let txt = ''

    function checkStatus() {
        switch (status) {
            case 'ativo':
                txt='Ativo'
                return styles.ativo
            case 'inativo':
                txt='Inativo'
                return styles.inativo
            default:
                break;
        }
    }

    return(
        <View style={styles.caixa}>
            <View style={styles.cliente}>
                <Title style={{fontWeight:'bold'}}>{nomeCorretor}</Title>
                <Texto>{emailCorretor}</Texto>
            </View>      
            <View style={styles.corretor}>
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
        justifyContent: 'flex-end',
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
    inativo: {
        backgroundColor: '#cecece',
        borderColor:'#9C9797'
    },
    ativo: {
        backgroundColor: '#B9D9B7',
        borderColor:'#6C8664'
    }

})