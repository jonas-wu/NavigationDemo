import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class LoginScreen2 extends Component {
  state = {
    email: '',
    password: '',
    fontLoaded: false,
    selectedCategory: 0,
    isLoading: false,
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmationValid: true,
  }

  render() {
    return (
      <View style={{flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
        <Text>LoginScreen2</Text>
      </View>
    )
  }
}
