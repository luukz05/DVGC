import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';
import axios from 'axios';
import { useTheme } from '../components/ThemeContext';
import { scheduleNotificationAsync } from 'expo-notifications';
import FlatListItem from '../components/FlatlistItem';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,  // Permite a reprodução de som
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250], // Padrão de vibração
        lightColor: '#FF231F7C',
        sound: 'default',  // Configura o som padrão para notificações no Android
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('Failed to get push token for push notification!');
      }
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'a1fd402c-6ecf-4883-8a51-c467cfc9a5ac' })).data;
    } else {
      throw new Error('Must use physical device for Push Notifications');
    }
  } catch (error) {
    console.error('Error in registerForPushNotificationsAsync:', error);
  }

  return token;
}

export function Vazamento() {
  const [data, setData] = useState([]);
  const { isDarkMode } = useTheme();
  const styles = isDarkMode ? darkStyles : lightStyles;
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  const timestamp = new Date(data.timestamp);
  const formattedDate = `${timestamp.toLocaleDateString()} `;
  const formattedTime = `${timestamp.toLocaleTimeString()} `;

  useEffect(() => {
    fetchData();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(handleNotification);
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [data]);

  const handleNotification = (notification) => {
    setNotification(notification);
  };

  const sendNotification = async () => {
    try {
      await scheduleNotificationAsync({
        content: {
          title: 'DVGC Mobile',
          body: 'Vazamento Detectado!',
          sound: 'default',  // Configura o som padrão para a notificação
          vibrate: [0, 250, 250, 250], // Padrão de vibração
        },
        trigger: null, // Dispara imediatamente
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.15.2:3000/alert');
      const newData = response.data;
      if (newData.length > data.length) {
        sendNotification();
      }
      setData(newData);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total de vazamentos: {data.length}</Text>
      </View>
      <View style={styles.passwordListContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <FlatListItem data={item} />}
            keyExtractor={(item) => item.id.toString()}
            inverted={true}
          />
        ) : (
          <Text style={styles.nenhumDado}>Nenhum vazamento registrado</Text>
        )}
      </View>
    </View>
  );
}

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323', // Set the background color for the entire component
  },
  header: {
    backgroundColor: '#232323',
    paddingTop: 44,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
  },
  deleteAllText: {
    color: '#ffffff',
  },
  passwordListContainer: {
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(24,24,24,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#2e2e2e',
    width: '85%',
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    gap: 50,
  },
  modalButton: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  modalButtonSave: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  nenhumDado: {
    display: 'flex',
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    alignContent:`center`,
    color: '#555',
    fontSize: 20,
  }
});
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    backgroundColor: '#rgba(24,24,fff,0.6)',
    paddingTop: 58,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
  },
  deleteAllText: {
    color: '#000000',
  },
  passwordListContainer: {
    marginTop: 15,
  },
  modalContainer: {
    backgroundColor: 'rgba(24,24,24,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
    marginBottom: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    gap: 50,
  },
  modalButton: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  modalButtonSave: {
    backgroundColor: '#0e0e0e',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#eee',
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
  },
});