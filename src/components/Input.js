import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Input = ({
  label, 
  iconName, 
  error, 
  password, 
  onFocus =() => {}, 
  ...props
  
  }) => {

  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return(

    <View style={styles.container}>
      

      <View style={[styles.input, {
        borderColor: isFocused ? 'cyan':'white',
        
      }]}> 
          <Icon name={iconName} style={[styles.icon, {

          }]}  />
          <TextInput
            style={styles.textInput}
            onFocus={()=>{
              onFocus();
              setIsFocused(true);
            }}
            onBlur={()=> setIsFocused(false)}
            secureTextEntry={hidePassword}
            {...props}

          />
          {password && (
              <Icon 
              onPress={() => setHidePassword(!hidePassword)} 
              name={hidePassword ? 'eye' : 'eye-slash'}
              style={styles.eyeIcon}  
              />
          )}
      </View>
      {error && (<Text style={styles.textError}>{error}</Text>)}
      
    </View> 
  )
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 20,
  },
  input:{
    backgroundColor: 'transparent',
    height: 55,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.75,
    borderColor: 'white',
    alignItems: 'center',
    borderRadius: 10
  },
  icon:{
    fontSize: 18,
    color: 'white',
  },
  eyeIcon:{
    fontSize: 15,
    color: 'white',
  },
  textInput:{
    paddingLeft: 10,
    color: 'white',
    flex: 1,
  },
  textError:{
    marginTop: 7,
    fontSize: 12,
    color: `#ff7f50`
  }
})

export default Input