import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'

import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils'

const BG_IMAGE = require('../../../assets/images/wallpaper_3.jpg')

export default class ListScreen3 extends Component {
  render() {
    return (
      <View style={{flex: 1, }}>
        <ImageBackground source={BG_IMAGE} style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
          }}>Lists Screen 3</Text>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
