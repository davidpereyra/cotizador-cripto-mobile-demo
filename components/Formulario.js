import { useState, useEffect } from "react";

import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

import axios from "axios";

const Formulario = ({
    moneda,
    criptomoneda,
    guardarMoneda,
    guardarCriptomoneda,
    guardarConsultarApi
}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);
    

    const obtenerMoneda = moneda => {  //seleccion de usuario
        guardarMoneda(moneda);
    }
    
    const obtenerCriptoMoneda = cripto => {
        guardarCriptomoneda(cripto);
    }

    const cotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        // cambiar el state de consultar api
        guardarConsultarApi(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

    return (  
        <View>
            <Text style={styles.label}> Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 120}}
            >
                <Picker.Item label=" - Seleccione - " value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
                <Picker.Item label="Peso Argentino" value="ARS" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
            </Picker>
   
            <Text style={styles.label}> Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptoMoneda(cripto)}
                itemStyle={{ height: 120}}
            >
                <Picker.Item label=" - Seleccione - " value="" />
                { criptomonedas.map( cripto =>(
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text
                    style={styles.textoCotizar}
                >
                    Cotizar
                </Text>
            </TouchableHighlight>
        </View>
    );
}
 
const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: "uppercase",
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5e49e2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar: {
        color: '#fff',
        fontFamily: 'Lato-Black',
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: 18
        
    }
})
export default Formulario;
