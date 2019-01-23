import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Icon } from 'react-native-elements'

import ProfileScreen from './ProfileScreen'

export default class Profile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='person'
        size={30}
        type='material'
        color={tintColor}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileScreen/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(47,44,60,1)',
  }
})
