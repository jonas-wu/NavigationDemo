import React, { PureComponent } from 'react'
import { Platform } from 'react-native'
import DefaultHeaderButtons from 'react-navigation-header-buttons';

export default class HeaderButtons extends PureComponent {
  static Item = DefaultHeaderButtons.Item

  render() {
    return (
      <DefaultHeaderButtons
        color={Platform.OS === 'ios' ? '#037aff' : 'black'}
        {...this.props}
      />
    )
  }
}
