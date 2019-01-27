import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { createNavigator, SafeAreaView, TabRouter, createAppContainer } from 'react-navigation';
import SampleText from './SampleText';
import Button from './commonComponents/MarginButton';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ horizontal: 'always' }}>
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => {
          navigation.goBack(null);
        }}
        title="Go back"
      />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);

const MyNotificationsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

const CustomTabBar = ({navigation}) => {
  const {routes} = navigation.state
  return (
    <SafeAreaView style={{flexDirection: 'row', height: 48}}>
      {routes.map(route => (
        <BorderlessButton
          onPress={() => navigation.navigate(route.routeName)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
            borderWidth: 1,
            borderColor: '#f00',
            borderRadius: 4,
          }}
          key={route.routeName}
        >
          <Text>{route.routeName}</Text>
        </BorderlessButton>
      ))}
    </SafeAreaView>
  )
}

const CustomTabView = ({descriptors, navigation}) => {
  const {routes, index} = navigation.state
  const descriptor = descriptors[routes[index].key]
  const Screen = descriptor.getComponent()
  // console.log('state', navigation.state)
  // console.log('descriptors', descriptors)
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <CustomTabBar navigation={navigation}/>
      <Screen navigation={descriptor.navigation}/>
    </SafeAreaView>
  )
}

const CustomTabRouter = TabRouter(
  {
    Home: {
      screen: MyHomeScreen,
      path: '',
    },
    Notifications: {
      screen: MyNotificationsScreen,
      path: 'notifications'
    },
    Settings: {
      screen: MySettingsScreen,
      path: 'settings'
    }
  },
  {
    initialRouteName: 'Home'
  }
)

export default createAppContainer(createNavigator(CustomTabView, CustomTabRouter, {}))