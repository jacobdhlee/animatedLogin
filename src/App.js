import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import { Content, Form, Item, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
// import { StackNavigator } from 'react-navigation'
// import Animation from 'lottie-react-native';

const { width, height } = Dimensions.get('window')

class App extends Component {
  constructor() {
    super()
    this.state = {
      toggle: false,
      open: false,
    }

    this.animatedValue = new Animated.Value(0)
    this.animateValue1 = new Animated.Value(0)
    this.animateValue2 = new Animated.Value(0)
    this.animateValue3 = new Animated.Value(0)

    this.backAnimation = this.backAnimation.bind(this);
    this.animated = this.animated.bind(this);
    this.expandComponent = this.expandComponent.bind(this);
    this.signUpAnimation = this.signUpAnimation.bind(this);
  }

  componentWillMount() {
    LayoutAnimation.spring();
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.animated()
  }

  componentWillUpdate() {
    this.signUpAnimation()
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
      setTimeout( () => {
        this.animated()
      }, 5000) 
    }
  }

  signUpAnimation() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
    }).start()
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  }

  expandComponent() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({toggle: !this.state.toggle});
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

    const logAndSignButton = (
      <View style={styles.buttonContainer}>
        <Animated.View style={[{ left: loginButton }, { opacity: this.animateValue2}]}>
          <TouchableOpacity style={styles.button} onPress={() => this.backAnimation('login')}>
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[{ right: signupButton }, { opacity: this.animateValue3}]}>
          <TouchableOpacity style={styles.button} onPress={() => this.setState({open: !this.state.open})}>
            <Text style={styles.text}>Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )

    const signUpForm = (
      <Animated.View style={[styles.signupBox, {opacity: this.animatedValue}]}>
        <Content contentContainerStyle={{marginBottom:5}}>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item>
              <Input placeholder="Password" />
            </Item>
            <Item>
              <Input placeholder="Confirm Password" />
            </Item>
          </Form>
        </Content>
      </Animated.View>
    )

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animationContainer, { opacity: this.animateValue1 }]}>
          <Text style={{fontSize: 25, fontWeight: '700'}}>Animation Login</Text>
        </Animated.View>
        {this.state.open ? signUpForm : logAndSignButton}
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
  signupBox: {
    flex: 17,
    padding: 20,
  },
  signupButton: {
    margin: 5,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600'
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