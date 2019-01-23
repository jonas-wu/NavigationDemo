import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'

import LoginScreen1 from './LoginScreen1'
import LoginScreen2 from './LoginScreen2'

export default class Login extends Component {
  static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='email'
        size={30}
        type='material'
        color={tintColor}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <LoginScreen1/>
          <LoginScreen2/>
          <LoginScreen1/>
          <LoginScreen2/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})
