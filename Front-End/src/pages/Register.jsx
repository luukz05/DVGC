import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [iconName, setIconName] = useState("eye");

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    axios
      .post("http://192.168.15.2:3000/api/register", { username, password })
      .then((response) => {
        const { data } = response;
        if (data.message === "Cadastro bem-sucedido") {
          navigation.navigate("Login");
        } else {
          alert("Cadastro falhou, tente novamente");
        }
      })
      .catch((error) => {
        console.error("Erro durante a conexão ao cadastro" + error);
        alert("Erro no cadastro");
      });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      flex: 1,
    },
    input: {
      width: 300,
      height: 40,
      backgroundColor: "#fff",
      marginBottom: 20,
      padding: 10,
      borderRadius: 5,
      color: "#333",
      borderWidth:1
    },
    inputp: {
      width: 255,
      height: 40,
      backgroundColor: "#fff",
      marginBottom: 20,
      padding: 10,
      borderRadius: 5,
      color: "#333",
      borderWidth:1
    },
    button: {
      backgroundColor: "#ffffff",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
      width:270,
      borderWidth:1,
      justifyContent:"center",
      alignContent:"center"
    },
    buttonText: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 16,
      alignSelf:"center"
    },
    seeButton: {
      backgroundColor: "#ffffff",
      color: "#000",
      borderWidth:1,
      width: 40,
      height:40,
      borderRadius:5,
      justifyContent:"center",
      alignItems:"center"
    },
    logo: {
      height: 200,
      width: 200,
      marginTop:100
    },
    buttonTextr: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
      alignSelf:"center"
    },
    buttonr: {
      backgroundColor: "#000",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
      width:270,
      borderWidth:1,
      justifyContent:"center",
      alignContent:"center"
    },
  });
  
  
    const handlePress = () => {
      const newIconName = iconName === "eye" ? "eye-off" : "eye";
      setSecure(!secure);
      setIconName(newIconName);
    };
  
    return (
      <View style={styles.container}>
        <View style={{ gap:35, alignItems:"center", justifyContent:"center"}}>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/1168602368766648380/1180167559601987654/favicon.png?ex=657c6fb0&is=6569fab0&hm=b3ba119ed701aa2992e50c2118d1fca6cfdfe7fb270f0d22be3514e9ae276c37&"}} style={styles.logo} />
          <Text>Register</Text>
          <View style={{justifyContent: "center", alignItems: "center",}}>
            <TextInput
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
              value={username}
              style={styles.input}
            />
            <View style={{flexDirection:"row", gap:5}}>
              <TextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.inputp}
                secureTextEntry={secure}
              />
              <TouchableOpacity style={styles.seeButton} onPress={handlePress}>
                <Ionicons size={25} name={iconName} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Sign-Up</Text>
            </TouchableOpacity>
            <Text style={{marginTop:25}}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateLogin} style={styles.buttonr}>
              <Text style={styles.buttonTextr}>Sign-In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  

export default Register; 

