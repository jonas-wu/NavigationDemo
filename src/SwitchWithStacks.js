import React, { Component } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Button from './commonComponents/MarginButton';

class LoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    let initialRoute = userToken ? 'App' : 'Auth'
    this.props.navigation.navigate(initialRoute)
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle='default'/>
      </View>
    )
  }
}

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in'
  }

  _signInAsync = async () => {
    const userToken = await AsyncStorage.setItem('userToken', 'jonas')
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign in!' onPress={this._signInAsync}/>
        <Button title='Go back' onPress={() => this.props.navigation.goBack(null)}/>
        <StatusBar barStyle='default'/>
      </View>
    )
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcomme to the app'
  }

  _signOutAsync = async () => {
    const userToken = await AsyncStorage.removeItem('userToken')
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Show more app' onPress={() => this.props.navigation.navigate('Other')}/>
        <Button title='Sign me out' onPress={this._signOutAsync}/>
        <StatusBar barStyle='default'/>
      </View>
    )
  }
}

class OtherScreen extends Component {
  static navigationOptions = {
    title: 'Other'
  }

  _signOutAsync = async () => {
    const userToken = await AsyncStorage.removeItem('userToken')
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign me out' onPress={this._signOutAsync}/>
        <StatusBar barStyle='default'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const AuthStack = createStackNavigator({SignIn: SignInScreen})
const AppStack = createStackNavigator({Home: HomeScreen, Other: OtherScreen})


export default createSwitchNavigator({
  Loading: LoadingScreen,
  Auth: AuthStack,
  App: AppStack,
})
