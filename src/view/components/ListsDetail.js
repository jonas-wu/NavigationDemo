import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListsDetail extends Component {
  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener('didBlur', payload => console.log(payload))
    console.log(this.didBlurSubscription)
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove()
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ListsDetail</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
