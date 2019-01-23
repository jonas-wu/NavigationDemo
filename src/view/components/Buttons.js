import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements'

export default class Buttons extends Component {

  render() {
    // console.log(this.props.navigation)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Buttons</Text>
        <Button
          title='detail'
          onPress={() => {
            this.props.navigation.push('Detail')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
