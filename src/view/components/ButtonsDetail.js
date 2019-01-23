import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ButtonsDetail extends Component {

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener('willBlur', payload => console.log(payload))
    console.log(this.didBlurSubscription)
  }

  componentWillUnmount() {
    this.willBlurSubscription.remove()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ButtonsDetail</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
