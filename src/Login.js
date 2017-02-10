import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Input from './common/input';
import Button from './common/button';

const animations = (animationValue, duration) => {
  Animated.timing(animationValue, {
    toValue: 1,
    duration,
  }).start()
}

class Login extends Component {
  constructor() {
    super()

    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animateValue3 = new Animated.Value(0);
    this.fadeOutAnimation = this.fadeOutAnimation.bind(this);
    this.expandAnimationStart = this.expandAnimationStart.bind(this)
    this.movingButton = this.movingButton.bind(this);
  }

  componentWillMount() {
    this.animated()
  }
  
  animated() {
    this.animatedValue1.setValue(0);
    animations(this.animatedValue1, 4000)
  }

  fadeOutAnimation() {
    Animated.timing(this.animatedValue1, {
      toValue: 0,
      duration: 1000,
    }).start()
    this.expandAnimationStart()
    setTimeout( () => {
      Actions.main()
      animations(this.animatedValue1, 2000)
    }, 1000) 
  }

  movingButton() {
    Animated.timing(this.animateValue3, {
      toValue: 1,
      duration: 1000
    }).start()

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
  expandAnimationStart() {  
    Animated.parallel([
      this.movingButton(),      
      Animated.timing(this.animatedValue2, {
        toValue: 1,
        duration: 1000,
      })
    ]).start()
  }

  render() {
    const movingButton = this.animateValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50]
    })

    const interpolated = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 100],
    })

    const expandStyle = {
      transform: [
        {scale: interpolated}
      ]
    }

    return (
      <Animated.View style={[styles.container, {opacity: this.animatedValue1}]}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>Log in</Text>
        </View>

        <View style={styles.inputBox}>
          <Input 
            label={'Email Address'} 
            value={this.props.value} 
            onChangeText={this.props.onChnage}
            placeholder={this.props.placeholder}
            secureTextEntry={false}
            keyboardType={'email-address'}
            autoFocus={true}
            addStyle={styles.addInputStyle}
          />

          <Input 
            label={'Password'}
            value={this.props.value}
            onChangeText={this.props.onChnage}
            placeholder={this.props.placeholder}
            secureTextEntry={true}
            keyboardType={'email-address'}
            inputAdd={styles.AddLine}
          />
        </View>
        <View style={styles.buttonBox}>
          <Animated.View style={[styles.button, { left: movingButton }]}>
            <Animated.View style={expandStyle}>
              <TouchableOpacity style={styles.addStyleButton} onPress={this.fadeOutAnimation}>
                <Text style={styles.text}>Log In</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  inputBox: {
    flex: 3,
    padding: 20,
  },
  titleBox: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
  },
  addInputStyle: {
    marginBottom: 30,
  },
  buttonBox: {
    flex: 5,
    marginTop: 20,
    alignItems: 'flex-end'
  },
  button: {
    width: 100,
    height: 50,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addStyleButton: {
    width: 100,
    height: 50,
    backgroundColor: '#007aff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  }
})

export default Login;

// <Button 
//               text={'Log In'}
//               addStyle={styles.addStyleButton]}
//               onPress={this.fadeOutAnimation}
//               addTextStyle={[styles.textColor]}
//             />