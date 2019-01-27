import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Easing,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  createAppContainer,  
  SafeAreaView,
  StackRouter,
  createNavigator,
} from 'react-navigation';
import {Transitioner,} from 'react-navigation-stack'
import SampleText from './SampleText';
import Button from './commonComponents/MarginButton';

const MyNavScreen = ({ navigation, banner }) => (
  <SafeAreaView forceInset={{ top: 'always' }}>
    <SampleText>{banner}</SampleText>
    {navigation.state &&
      navigation.state.routeName !== 'Settings' && (
        <Button
          onPress={() => navigation.navigate('Settings')}
          title="Go to a settings screen"
        />
      )
    }
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
    <StatusBar barStyle="default" />
  </SafeAreaView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

class CustomNavigationView extends Component {
  render() {
    const { navigation, router, descriptors } = this.props;

    return (
      <Transitioner
        configureTransition={this._configureTransition}
        descriptors={descriptors}
        navigation={navigation}
        render={this._render}
      />
    );
  }

  _configureTransition(transitionProps, prevTransitionProps) {
    return {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    };
  }

  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene =>
      this._renderScene(transitionProps, scene)
    );
    return <View style={{ flex: 1 }}>{scenes}</View>;
  };

  _renderScene = (transitionProps, scene) => {
    const { navigation, router } = this.props;
    const { routes } = navigation.state;
    const { position } = transitionProps;
    const { index } = scene;

    console.log(`index=${index} position=${position._value}`);
    const animatedValue = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
    });

    const animation = {
      opacity: animatedValue,
      transform: [{ scale: animatedValue }],
    };

    const Scene = scene.descriptor.getComponent();
    return (
      <Animated.View key={index} style={[styles.view, animation]}>
        <Scene navigation={scene.descriptor.navigation} />
      </Animated.View>
    );
  };
}

class MyAnimView extends Component {
  state = {
    anim: new Animated.Value(0),
    fadeAnim: new Animated.Value(0.5),
    widthAnim: new Animated.Value(200),
    heightAnim: new Animated.Value(150),
  }

  componentDidMount() {
    // Animated.timing(this.state.fadeAnim, {
    //   toValue: 0.5,
    //   duration: 3000,
    // }).start()
  }

  render() {
    const w = Animated.divide(this.state.widthAnim, 2)
    return (
      <Animated.View
        style={{
          ...this.props.style, 
          // opacity: this.state.fadeAnim,
          white: 250,
          transform: [{
            translateY: this.state.anim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [-100, 0, 100],
            })
          }]
        }}
      >
        {this.props.children}
        <Button title='start' onPress={() => {
          Animated.sequence([
            Animated.timing(this.state.anim, {
              toValue: 1,
              duration: 2000,
            }),
          ]).start()
        }}/>
        <Button title='reset' onPress={() => {
          Animated.parallel([
            Animated.timing(this.state.widthAnim, {
              toValue: 200,
              duration: 0,
            }),  
            Animated.timing(this.state.heightAnim, {
              toValue: 150,
              duration: 0,
            })
          ]).start()
        }}
        />
      </Animated.View>
    )
  }
}

class MyComponent extends Component {
  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
        <MyAnimView style={{backgroundColor: 'blue', alignItems:'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 28, color: 'white'}}>Fading in</Text>
        </MyAnimView>
      </View>
    )
  }
}

const CustomRouter = StackRouter({
  Home: {screen: MyHomeScreen},
  Settings: {screen: MySettingsScreen}
})

const CustomTransitioner = createAppContainer(
  createNavigator(CustomNavigationView, CustomRouter, {})
);

export default CustomTransitioner;

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

