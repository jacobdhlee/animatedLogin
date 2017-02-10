import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  Easing,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
// import { StackNavigator } from 'react-navigation'
// import Animation from 'lottie-react-native';

const { width, height } = Dimensions.get('window')

class App extends Component {
  constructor() {
    super()
    
    this.animateValue1 = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
    this.animateValue3 = new Animated.Value(0)

    this.backAnimation = this.backAnimation.bind(this);
    this.animated = this.animated.bind(this);
  }

  componentWillMount() {
    this.animated()
  }

  animated() {
    this.animateValue1.setValue(0)
    this.animateValue2.setValue(0)
    this.animateValue3.setValue(0)

    const springAnimation = (value, duration, friction, tension) => {
      return Animated.spring(value, {
        toValue: 1,
        duration,
        friction,
        tension
      })
    }

    Animated.timing(this.animateValue1, {
      toValue: 1,
      duration: 1000
    }).start()

    Animated.parallel([
      springAnimation(this.animateValue2, 1000, 5, 10),
      springAnimation(this.animateValue3, 1000, 5, 10)
    ]).start()
  }

  backAnimation(form) {     
    const fadeoutAnimation = ( value, duration ) => {
      return Animated.timing( value, {
        toValue: 0,
        duration,
      }) 
    } 
    
    Animated.parallel([
      fadeoutAnimation(this.animateValue1, 1000),
      fadeoutAnimation(this.animateValue2, 1000),
      fadeoutAnimation(this.animateValue3, 1000),
    ]).start()

    if(form === 'login') {
      setTimeout( () => {
        Actions.login()
        this.animated()
      }, 1000) 
    } else {
      setTimeout( () => {
        Actions.signup()
        this.animated()
      }, 1000) 
    }
  }

  render() {

    const loginButton = this.animateValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [-1000, 0]
    })

    const signupButton = this.animateValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [-1000, 0]
    })

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animationContainer, { opacity: this.animateValue1 }]}>
          <Text style={{fontSize: 25, fontWeight: '700'}}>Animation Login</Text>
        </Animated.View>
        <View style={styles.buttonContainer}>
          <Animated.View style={[{ left: loginButton }, { opacity: this.animateValue2}]}>
            <TouchableOpacity style={styles.button} onPress={() => this.backAnimation('login')}>
              <Text style={styles.text}>Log in</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[{ right: signupButton }, { opacity: this.animateValue3}]}>
            <TouchableOpacity style={styles.button} onPress={(form) => this.backAnimation()}>
              <Text style={styles.text}>Sign up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 }
    }),
   
  },
  animationContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 4,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: width * 0.8, 
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#007aff',
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  }
})

export default App;