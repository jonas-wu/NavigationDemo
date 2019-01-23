import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import ButtonsHome from './Buttons'
import ButtonsDetail from './ButtonsDetail'
import ListsHome from './Lists'
import ListsDetail from './ListsDetail'

const ButtonsTab = createStackNavigator({
  Home: {
    screen: ButtonsHome,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: 'Buttons',
      headerLeft: (
        <Icon
          name="menu"
          size={25}
          type="entypo"
          containerStyle={{ marginLeft: 10 }}
          onPress={navigation.openDrawer}
        />
      ),
    }),
  },
  Detail: {
    screen: ButtonsDetail,
    path: '/detail',
    navigationOptions: {
      title: 'Buttons Detail',
    },
  },
})

const ListsTab = createStackNavigator({
  Home: {
    screen: ListsHome,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: 'Lists',
      headerLeft: (
        <Icon
          name="menu"
          size={25}
          type="entypo"
          containerStyle={{ marginLeft: 10 }}
          onPress={navigation.openDrawer}
        />
      ),
    }),
  },
  Detail: {
    screen: ListsDetail,
    path: '/detail',
    navigationOptions: {
      title: 'Lists Detail',
    },
  },
})

export default Components = createMaterialTopTabNavigator(
  {
    Buttons: {
      screen: ButtonsTab,
      path: '/buttons',
      navigationOptions: {
        tabBarLabel: 'Buttons',
        tabBarIcon: ({tintColor, focused}) => (
          <Icon
            name={focused ? 'emoticon-cool' : 'emoticon-neutral'}
            size={25}
            type="material-community"
            color={tintColor}
          />
        )
      }
    },
    Lists: {
      screen: ListsTab,
      path: '/lists',
      navigationOptions: {
        tabBarLabel: 'Lists',
        tabBarIcon: ({tintColor, focused}) => (
          <Icon
            name='list'
            size={25}
            type="entypo"
            color={tintColor}
          />
        )
      }
    },
    // Lists: {
    //   screen: ListsTab,
    //   path: '/lists',
    // },
    // Input: {
    //   screen: InputTab,
    //   path: '/input',
    // },
    // Fonts: {
    //   screen: FontsTab,
    //   path: '/fonts',
    // },
  }, {
    initialRouteName: 'Buttons',
    animationEnabled: false,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
    }
  }
)

Components.navigationOptions = {
  drawerLabel: 'Components',
  drawerIcon: ({tintColor}) => (
    <Icon
      name='settings'
      size={25}
      type='material'
      color={tintColor}
    />
  )
}

