import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Input from './common/input';
import Button from './common/button';

class Signup extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input 
          label={'Email'} 
          value={this.props.value} 
          onChangeText={this.props.onChnage} 
          placeholder={this.props.placeholder} 
          secureTextEntry={false}
          keyboardType={'email-address'}
        />

        <Input 
          label={'Password'}
          value={this.props.value}
          onChangeText={this.props.onChnage}
          placeholder={this.props.placeholder} 
          secureTextEntry={true}
          keyboardType={'email-address'}
        />

        <Input 
          label={'Confirm'}
          value={this.props.value}
          onChangeText={this.props.onChnage} 
          placeholder={this.props.placeholder} 
          secureTextEntry={true}
          keyboardType={'email-address'}
        />

        <View>
          <Button 
            text={'Sign up'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Signup;