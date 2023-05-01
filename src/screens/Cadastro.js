import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, } from 'react-nati|ve';
import { NavigationContainer }  from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { auth, db } from './../config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

const Stack = createNativeStackNavigator(); // <-- resume o código 

const schema = yup.object({
  username: yup.string().required("Informe seu nome"),
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve conter no mínimo 6 dígitos").required("Informe sua senha")
})

export default function App({ navigation }) {

  const {control, handleSubmit, formState: {errors}} = React.useForm({
    resolver: yupResolver(schema)
  })

  function registerFirebase (schema) {
  
  auth.createUserWithEmailAndPassword(schema.email, schema.password).then(() => {
    alert("Cadastrado com Sucesso!");  
    
    db.collection("Users").doc(schema.email).set({name: schema.username})
  .then(() => {
    navigation.navigate('Login'); // Código que "Puxa" a Tela Secundária
  })
  .catch((error) => {
      console.error();
  });
  })
  .catch((error) => {
    alert(error.message)
  });
  }
  const [hidepass, setHidepass] = React.useState(true);

//const goToScreenDrawer = () => {
//navigation.navigate('Drawer'); // Código que "Puxa" a Tela Secundária
//};


return (
  <View style={styles.container}>
    <Image style={styles.logo} source={require('../../assets/icon1.png')}/>
    <Controller 
      control = {control}
      name="username"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInput
          style={[
            styles.input, {
              borderWidth: errors.username && 1,
              borderColor: errors.username && '#ff375b' 
            }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite seu nome completo"
            placeholderTextColor="black"
        />
      )}
    />
    {errors.date && <Text style = {styles.labelError}>{errors.date?.message}</Text>} 
    <Controller 
      control = {control}
      name="email"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInput
          style={[
            styles.input, {
              borderWidth: errors.email && 1,
              borderColor: errors.email && '#ff375b' 
            }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite seu email"
            placeholderTextColor="black"
        />
      )}
    />
    {errors.email && <Text style = {styles.labelError}>{errors.email?.message}</Text>} 
    <View style={styles.password}>
    <Controller 
      control = {control}
      name="password"
      render={({field:{onChange, onBlur, value}}) => (
        <TextInput
          style={[
            styles.inputpass, {
              borderWidth: errors.password && 1,
              borderColor: errors.password && '#ff375b' 
            }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Digite sua senha"
            secureTextEntry={hidepass}
            placeholderTextColor="black"
          />
        )}
      />
      <TouchableOpacity style={styles.icon} onPress={() => setHidepass(!hidepass)}>
      {hidepass ? 
      <Ionicons name="eye" size={16}/>
      : 
      <Ionicons name="eye-off" size={16}/>
      }      
      </TouchableOpacity>         
    </View>
    {errors.password && <Text style = {styles.labelError}>{errors.password?.message}</Text>}
    
    {/* Botão de Registrar*/}
    <TouchableOpacity style={styles.button} onPress={handleSubmit(registerFirebase)}>
      <LinearGradient 
      style={styles.btn}
      start={{x:0,y:1}}
      end={{x:1,y:0}}
      colors={['#181848', '#181848']}>
        <Text style={styles.buttonText}>Registrar</Text> 
      </LinearGradient>
    </TouchableOpacity>
  </View>
);
}