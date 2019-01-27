import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import {
  SafeAreaView,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';

import SampleText from './SampleText';
import Button from './commonComponents/MarginButton';

const HEADER_HEIGHT = 64;

const MyNavScreen = ({ navigation, banner, statusBarStyle }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ horizontal: 'always' }}>
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
        title="Open profile screen"
      />
      <Button
        onPress={() => navigation.navigate('NotifSettings')}
        title="Open notifications screen"
      />
      <Button
        onPress={() => navigation.navigate('SettingsTab')}
        title="Go to settings tab"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
    <StatusBar barStyle={statusBarStyle || 'default'} />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Home Screen"
    navigation={navigation}
    statusBarStyle="light-content"
  />
);

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}s Profile`}
    navigation={navigation}
  />
);

const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen
    banner="Settings Screen"
    navigation={navigation}
    statusBarStyle="light-content"
  />
);

function MaterialTopTabBarWithStatusBar(props) {
  return (
    <View style={{
      paddingTop: StatusBar.currentHeight,
      backgroundColor: 'green',
    }}>
      <MaterialTopTabBar {...props} jumpToIndex={() => {}}/>
    </View>
  )
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    MainTab: {
      screen: MyHomeScreen,
      navigationOptions: {
        title: 'Welcome',
      },
    },
    SettingsTab: {
      screen: MySettingsScreen,
      navigationOptions: {
        title: 'Settings',
      },
    },
  },
  {
    tabBarComponent: MaterialTopTabBarWithStatusBar,
    tabBarOptions: {
      tabStyle: {height: HEADER_HEIGHT},
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    Root: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    NotifSettings: {
      screen: MyNotificationsSettingsScreen,
      navigationOptions: {
        title: 'Notifications',
      },
    },
    Profile: {
      screen: MyProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}'s Profile!`,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {height: HEADER_HEIGHT},
    },
  }
);

export default StackNavigator;