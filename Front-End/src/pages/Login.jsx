import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity,Alert } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#242424",
    flex: 1,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: "#666",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: "#eee",
    borderWidth:1,
    borderColor:"#999"
  },
  inputp: {
    width: 255,
    height: 40,
    backgroundColor: "#666",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: "#eee",
    borderWidth:1,
    borderColor:"#999"
  },
  button: {
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width:270,
    borderWidth:1,
    justifyContent:"center",
    alignContent:"center",
    
  },
  buttonr: {
    backgroundColor: "#00000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width:270,
    borderWidth:1,
    justifyContent:"center",
    alignContent:"center",
    borderColor:"#999"
  },
  buttonText: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf:"center"
  },
  buttonTextr: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf:"center"
  },
  seeButton: {
    backgroundColor: "#666",
    color: "#666",
    borderWidth:1,
    width: 40,
    height:40,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"#999"
  },
  logo: {
    height: 159,
    width: 299,
    marginTop:100,
    
  },
});

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [iconName, setIconName] = useState("eye");
 // admin/admin
 // DVGC001/SENHA
  const handleLogin = () => {
    axios
      .post("http://192.168.15.2:3000/login", { username, password })
      .then((response) => {
        const { data } = response;
        if (data.token) {
          setIsAuthenticated(true);
        } else {
          Alert.alert("Login Failed", "Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        Alert.alert("Login Error", "An error occurred during authentication");
      });
  };

  const handlePress = () => {
    const newIconName = iconName === "eye" ? "eye-off" : "eye";
    setSecure(!secure);
    setIconName(newIconName);
  };

  return (
    <View style={styles.container}>
      <View style={{display:"flex", flexDirection:"column" ,alignItems:"center", justifyContent:"space-between"}}>
        <Image source={require('./Home.png')}
          style={styles.logo}
        />
        
        <View style={{justifyContent: "center", alignItems: "center", marginTop:50}}>
          <TextInput
            placeholder="Usuário"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={styles.input}
          />
          <View style={{flexDirection:"row", gap:5}}>
            <TextInput
              placeholder="Senha"
              onChangeText={(text) => setPassword(text)}
              value={password}
              style={styles.inputp}
              secureTextEntry={secure}
            />
            <TouchableOpacity style={styles.seeButton} onPress={handlePress}>
              <Ionicons size={25} name={iconName} color={"#eee"}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;