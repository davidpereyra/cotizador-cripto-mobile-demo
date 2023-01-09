import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';

import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';



const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        // consulta api para cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        setCargando(true); // para mostrar spinner
        
        // oculta spinner y muestra resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarApi(false)
          setCargando(false); // para dejar de mostrar spinner
        }, 3000);
      }
    }
    cotizarCriptomoneda();
  }, [consultarApi])
  
  // mostrar el spinner o el resultado

  const componente = cargando 
    ? <ActivityIndicator 
        size={"large"}
        color= "#5e49e2"
      /> 
    : <Cotizacion 
        resultado={resultado}
      />

  return (
    <>
      <ScrollView>
        <Header />
        <Image 
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario 
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarApi={guardarConsultarApi}
          />
          
          </View>
          <View style={{marginTop:40}}>{componente}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
