import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Cotizacion = ({ resultado }) => {
    
    if (Object.keys(resultado).length === 0) return null;

    return (
        <View style={styles.resultado}>
            <Text style={[styles.texto, styles.precio]}>
                <Text style={styles.span}>{resultado.PRICE}</Text>
            </Text>
            <Text style={styles.texto}> Precio mas alto del dia: {' '}
                <Text style={styles.span}>{resultado.HIGHDAY}</Text>
            </Text>
            <Text style={styles.texto}> Precio mas bajo del dia: {' '}
                <Text style={styles.span}>{resultado.LOWDAY}</Text>
            </Text> 
            <Text style={styles.texto}> Variacion de ultimas 24 horas: {' '}
                <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} %</Text>
            </Text>
            <Text style={styles.texto}> Ultima actualizacion: {' '}
                <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    resultado:{
        backgroundColor: '#5e49e2',
        padding: 20,
    },
    texto:{
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        marginBottom: 10
    },
    precio:{
        fontSize: 38,
        textAlign: 'center'
    },
    span:{
        fontFamily: 'Lato-Black',

    },
})

export default Cotizacion