import React, { PureComponent } from 'react'
import { Platform, View } from 'react-native'
import BaseButton from './Button';

const Button = props => (
  <View style={{...Platform.select({
    android: {
      margin: 10
    }
  })}}>
    <BaseButton {...props}/>
  </View>
)

export default Button
