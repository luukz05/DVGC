import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import WebsiteButton from '../components/WebsiteButton';
import { useTheme } from '../components/ThemeContext';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const apiUrl = "http://192.168.15.2:3000/alert";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [timeUntilUpdate, setTimeUntilUpdate] = useState(null);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;

  
  const dataTest = {
    labels: ["January", "February", "March", "April", "May", "June","January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  useEffect(() => {
    if (lastUpdate) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = now - new Date(lastUpdate);
        const remainingTime = 60000 - (diff % 60000);
        setTimeUntilUpdate(remainingTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastUpdate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const latestLeak = data.length > 0 ? data[data.length - 1] : null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const dataChart = {
    labels:  data.map(item => formatDate(item.timestamp)),
    datasets: [
      {
        data: data.slice(-data.length).map(item => item.gas_intensity || 0),
        strokeWidth: 2,
      },
    ],
  };

  const calculateAverageIntensity = () => {
    if (data.length === 0) return 0;
    const totalIntensity = data.reduce((sum, item) => sum + (item.gas_intensity || 0), 0);
    return (totalIntensity / data.length).toFixed(2);
  };

  const findMaxIntensity = () => {
    if (data.length === 0) return 0;
    return Math.max(...data.map(item => item.gas_intensity || 0));
  };

  const handleForceUpdate = () => {
    fetchData();
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#242424' : '#eee' }]}>
      <Image
        source={require('./Home.png')}
        style={styles.logo}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10, alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#fff', padding: 3 }}>Última Atualização: {lastUpdate ? new Date(lastUpdate).toLocaleString() : 'Aguardando primeira atualização...'}</Text>
        <Text style={{ fontSize: 12, color: '#fff', padding: 3 }}>Próxima Atualização: {timeUntilUpdate ? formatTime(timeUntilUpdate) : '-'}</Text>
        <TouchableOpacity onPress={handleForceUpdate}>
          <Text style={{ fontSize: 10, color: '#333', backgroundColor: '#fff', padding: 3, borderRadius: 50 }}><Ionicons size={20} name="refresh" /></Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? '#eee' : '#000'} />
      ) : data.length === 0 ? (
        <Text style={[{
          color: isDarkMode ? '#eee' : '#000', display: 'flex',
          justifyContent: "center",
          textAlign: "center",
          alignSelf: "center",
          alignContent: `center`,
          color: '#555',
          fontSize: 20,
        }]}>Nenhum dado disponível no momento.</Text>
      ) : (
        <>
          <View style={[styles.square, { borderColor: isDarkMode ? '#666' : '#000000', alignContent: 'center' }]}>
            <Text style={[styles.boldText, { color: isDarkMode ? '#eee' : '#000000' }]}>Total de Vazamentos Detectados</Text>
            <Text style={[styles.largeText, { color: isDarkMode ? '#eee' : '#000000' }]}>{data.length}</Text>
          </View>

          <View style={[styles.infoContainer, { backgroundColor: isDarkMode ? '#242424' : '#fff', borderColor: isDarkMode ? '#666' : '#ccc', }]}>
            <Text style={[styles.infoTitle, { color: isDarkMode ? '#eee' : '#000000', textAlign: 'center' }]}>Último Vazamento Registrado</Text>
            <ScrollView style={{ maxHeight: 150 }}>
              {latestLeak ? (
                <>
                  <Text style={[styles.infoText, { color: isDarkMode ? '#eee' : '#000000', }]}>
                    Data: {new Date(latestLeak.timestamp).toLocaleDateString()}
                  </Text>
                  <Text style={[styles.infoText, { color: isDarkMode ? '#eee' : '#000000', textAlign: 'center' }]}>
                    Hora: {new Date(latestLeak.timestamp).toLocaleTimeString()}
                  </Text>
                  <Text style={[styles.infoText, { color: isDarkMode ? '#eee' : '#000000', textAlign: 'center' }]}>
                    Intensidade: {latestLeak.gas_intensity} ppm
                  </Text>
                </>
              ) : (
                <Text style={[styles.infoText, { color: isDarkMode ? '#eee' : '#000000' }]}>Nenhum vazamento registrado ainda.</Text>
              )}
            </ScrollView>

            <Text style={[styles.infoTitle, { color: isDarkMode ? '#eee' : '#000000', marginTop: 20, textAlign: 'center' }]}>Dados Importantes</Text>
            <ScrollView style={{ maxHeight: 150 }}>
              <Text style={[styles.infoText, { color: isDarkMode ? '#eee' : '#000000', textAlign: 'center' }]}>
                Intensidade Média: {calculateAverageIntensity()} ppm
              </Text>
              <Text style={[styles.infoText, { color: isDarkMode ? '#eee' : '#000000', textAlign: 'center' }]}>
                Intensidade Máxima Registrada: {findMaxIntensity()} ppm
              </Text>
            </ScrollView>
          </View>

          <Text style={[styles.infoTitle, { color: isDarkMode ? '#eee' : '#000000', alignSelf: 'center' }]}>Histórico de Vazamentos</Text>
          <ScrollView horizontal>
          <LineChart
        data={dataChart}
        width={Dimensions.get('window').width * 5} // Largura maior para acomodar todos os pontos
        height={280}
        chartConfig={{
          backgroundColor: isDarkMode ? '#242424' : '#fff',
          backgroundGradientFrom: isDarkMode ? '#242424' : '#fff',
          backgroundGradientTo: isDarkMode ? '#242424' : '#fff',
          color: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: isDarkMode ? '#ffa726' : '#000',
          },
        }}
        style={styles.chart}
        withDots={true}
        segments={10}  // Ajuste o número de segmentos verticais
        fromZero={true}
        xLabelsOffset={-10} // Alinha melhor as labels no eixo x
        withVerticalLabels={true} // Mostra labels verticais
        yAxisInterval={10} // Intervalo de labels no eixo y
        xAxisInterval={10} // Mostra uma label para cada ponto
      />

</ScrollView>
          <WebsiteButton websiteUrl="https://g1.globo.com/pr/campos-gerais-sul/noticia/2024/01/26/saiba-como-descobrir-vazamento-de-gas-em-casa-e-o-que-fazer.ghtml" ButtonName="Clique aqui e saiba mais!" />
        </>
      )}
    </ScrollView>
  );
}



const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 134.5,
    width: 250,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
    padding: 5,
  },
  square: {
    width: "90%",
    height: 180,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  largeText: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
  },
  latestLeakContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 10,
  },
  infoContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  logo: {
    height: 134.5,
    width: 250,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
    padding: 5,
  },
  square: {
    width: "90%",
    height: 175,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#666',
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#242424",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    color: '#eee',
    backgroundColor: "#242424",
  },
  largeText: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#eee',
  },
  latestLeakContainer: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#242424",
    borderColor: '#666',
  },
  infoContainer: {
    width: "90%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#242424",
    borderColor: '#666',
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#eee',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#eee',
    textAlign: 'center'
  },
});
