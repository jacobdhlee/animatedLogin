import React from 'react';
import { 
  TextInput, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

const Input = ({ label,autoFocus, value, onChangeText, placeholder ,secureTextEntry, keyboardType, addStyle }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={[containerStyle, addStyle]}>
      <Text style={labelStyle}>
        {label}
      </Text>
      <TextInput
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        onChangeText={onChangeText}
        value = {value}
        autoFocus={autoFocus}
        multiline={false}
      />
    </View>
  )
}

const styles = {
  containerStyle:{
    height: 40,
    borderBottomWidth: 1,
    flex: 1,
  },

  inputStyle:{
    color:'#000',
    paddingHorizontal: 5,
    fontSize: 18,
    flex: 2,
  },
  labelStyle:{
    fontSize: 15,
    flex: 1,
  },
}

export default Input;