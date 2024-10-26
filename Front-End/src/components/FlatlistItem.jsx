import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext'; // Import the useTheme hook

export default function FlatListItem({ data, removePassword, copyPassword }) {
  const { isDarkMode } = useTheme(); // Get the current theme mode
  const styles = isDarkMode ? darkStyles : lightStyles; // Use the appropriate styles based on the theme

  // Se os dados estiverem indefinidos, retornar null para evitar erros
  if (!data || !data.timestamp || !data.gas_intensity) {
    return null;
  }

  // Converte o timestamp para um objeto Date
  const timestamp = new Date(data.timestamp);
  // Formata a data para exibição
  const formattedDate = `${timestamp.toLocaleDateString()} `; 
  const formattedTime = `${timestamp.toLocaleTimeString()} `;
  return (
    <View style={{ alignItems: "center", justifyContent:'center',alignContent:'center' }}>
      <TouchableOpacity style={styles.pressable}>
        <View style={{alignItems: "center", justifyContent:'center',alignContent:'center'}}>
          <Text style={{ color: isDarkMode ? "#eee" : "#000000"}}> <Ionicons size={15} name="calendar"/> {formattedDate} </Text>
        </View>
        <View style={{alignItems: "center", justifyContent:'center',alignContent:'center'}}>
          <Text style={{ color: isDarkMode ? "#eee" : "#000000"}}> <Ionicons size={15} name="time"/> {formattedTime} </Text>
        </View>
        <View style={{alignItems: "center", justifyContent:'center',alignContent:'center'}} >
          <Text style={{ color: isDarkMode ? "#eee" : "#000000", alignItems: 'center' }}> <Ionicons size={15} name="flame"/> {data.gas_intensity} ppm </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


const commonStyles = {
  pressable: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems:"center",
    
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  pressable: {
    ...commonStyles.pressable,
    borderColor: '#ccc', // Light mode border color
  },
  button: {
    ...commonStyles.button,
    borderColor: '#ccc', // Light mode border color
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  pressable: {
    ...commonStyles.pressable,
    borderColor: '#666', // Dark mode border color
    backgroundColor: '#232323', // Dark mode background color
  },
  button: {
    ...commonStyles.button,
    borderColor: '#666', // Dark mode border color
    backgroundColor: '#232323', // Dark mode background color
  },
});
