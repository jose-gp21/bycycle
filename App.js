import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Cadastro from './src/screens/Cadastro';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Cadastro'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options = {{ headerShown : false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options = {{ headerShown : false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options = {{ headerShown : false}}/>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
