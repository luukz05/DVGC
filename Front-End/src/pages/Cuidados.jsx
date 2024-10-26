import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const SafetyCard = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const SafetyCards = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cuidados</Text>
        </View>
        <SafetyCard
          title="Identifique o vazamento"
          description="Preste atenção a cheiros incomuns, como o cheiro de enxofre ou de ovos podres, que são associados ao vazamento de gás."
        />
        <SafetyCard
          title="Evacue o local"
          description="Saia imediatamente da casa, evitando acender qualquer dispositivo elétrico ou fogo."
        />
        <SafetyCard
          title="Desligue o suprimento de gás"
          description="Se seguro, desligue a válvula de fechamento principal de gás para cortar o fornecimento de gás para a casa."
        />
        <SafetyCard
          title="Abra portas e janelas"
          description="Abra portas e janelas para ventilar o ambiente e dissipar o gás, se for seguro fazer isso."
        />
        <SafetyCard
          title="Não tente corrigir o vazamento"
          description="Deixe que profissionais qualificados lidem com a situação. Não tente consertar o vazamento por conta própria."
        />
        <SafetyCard
          title="Chame os serviços de emergência"
          description="Ligue para os serviços de emergência ou para a concessionária de gás para relatar o vazamento."
        />
        <SafetyCard
          title="Não retorne até ser liberado"
          description="Não retorne à casa até que um profissional autorize a reentrada de forma segura."
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#232323',
    paddingTop: 15,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#242424',
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    width: '90%',
    alignSelf: 'center',
    alignContent:"center",
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#eee',
    textAlign:"center"
  },
  description: {
    fontSize: 16,
    color: '#eee',
    textAlign:"justify"
  },
});

export default SafetyCards;
