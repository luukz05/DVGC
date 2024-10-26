// WebsiteButton.js
import React from 'react';
import { TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from './ThemeContext';

export default function WebsiteButton({ websiteUrl, ButtonName }){
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;
  
  
  const openWebsite = () => {
    Linking.openURL(websiteUrl);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openWebsite}>
      <Text style={styles.buttonText}>{ButtonName}</Text>
    </TouchableOpacity>
  );
};

WebsiteButton.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
};

const lightStyles = StyleSheet.create({
  button: {
    borderWidth:1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf:'center',
    margin: 10,
    backgroundColor:"#eee",
    width:'20%',
    borderColor:"#555"
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});

const darkStyles = StyleSheet.create({
  button: {
    borderWidth:1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    width:"90%",
    borderColor:"#555",
    backgroundColor:"#242424",
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

