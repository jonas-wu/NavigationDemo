import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'

import ListScreen1 from './ListScreen1'
import ListScreen2 from './ListScreen2'
import ListScreen3 from './ListScreen3'
import ListScreen4 from './ListScreen4'

export default class List extends Component {
  static navigationOptions = {
    drawerLabel: 'Lists',
    drawerIcon: ({tintColor}) => (
      <Icon
        name='list'
        size={30}
        type='material'
        color={tintColor}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ScrollView horizontal pagingEnabled decelerationRate='normal' showsHorizontalScrollIndicator={false}>
          <ListScreen1/>
          <ListScreen2/>
          <ListScreen3/>
          <ListScreen4/>
        </ScrollView>
      </View>
    )
  }
}
