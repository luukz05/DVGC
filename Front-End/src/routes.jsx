import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';

import { Vazamento } from './pages/Vazamentos';
import Home from './pages/Home';
import Cuidado from './pages/Cuidados';
import Login from './pages/Login';
import Register from './pages/Register';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = ({ setIsAuthenticated }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Register"
      component={Register}
      options={{
        headerShown: false,
        tabBarVisibilityAnimationConfig: false,
        tabBarIcon: ({ focused, size, color }) => {
          return focused ? (
            <Ionicons size={size} color={color} name="finger-print" />
          ) : (
            <Ionicons size={size} color={color} name="finger-print-outline" />
          );
        },
      }}
    />
    <Stack.Screen
      name="Login"
      options={{
        headerShown: false,
        tabBarVisibilityAnimationConfig: false,
        tabBarIcon: ({ focused, size, color }) => {
          return focused ? (
            <Ionicons size={size} color={color} name="finger-print" />
          ) : (
            <Ionicons size={size} color={color} name="finger-print-outline" />
          );
        },
      }}
    >
      {() => <Login setIsAuthenticated={setIsAuthenticated} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const AppStack = () => {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#fff' : "#008cff",
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: isDarkMode ? '#1d1d1d' : 'white', // Adjust background color based on dark mode
        },
      }}
    >
     
      <Tab.Screen 
          name="Vazamentos"
          component={Vazamento}
          options={{headerShown:false,
              tabBarIcon:({focused,size,color}) => {
                  if(focused){
                      return <Ionicons size={size} color={color} name="flame"/>
                  }
                  return  <Ionicons size={size} color={color} name="flame-outline"/>
              }
          
          }}
      />
      <Tab.Screen 
          name="Início"
          component={Home}
          options={{headerShown:false, 
              tabBarIcon:({focused,size,color}) => {
                  if(focused){
                      return <Ionicons size={size} color={color} name="home"/>
                  }
                  return  <Ionicons size={size} color={color} name="home-outline"/>
              }
          }}
      />
      <Tab.Screen 
          name="Cuidados"
          component={Cuidado}
          options={{headerShown:false,
              tabBarIcon:({focused,size,color}) => {
                  if(focused){
                      return <Ionicons size={size} color={color} name="warning"/>
                  }
                  return  <Ionicons size={size} color={color} name="warning-outline"/>
              }
          }}
      />
    </Tab.Navigator>
  );
};

export function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      <NavigationContainer independent={true}>
        {isAuthenticated ? (
          <AppStack />
        ) : (
          <AuthStack setIsAuthenticated={setIsAuthenticated} />
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
}
