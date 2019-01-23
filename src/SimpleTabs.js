import React, { Component } from 'react'
import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';
import { Animated, Platform, Text, StatusBar, View } from 'react-native';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  createBottomTabNavigator,
  withNavigation,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import Button from './commonComponents/MarginButton';

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a hendrerit dui, id consectetur nulla. Curabitur mattis sapien nunc, quis dignissim eros venenatis sit amet. Praesent rutrum dapibus diam quis eleifend. Donec vulputate quis purus sed vulputate. Fusce ipsum felis, cursus at congue vel, consectetur tincidunt purus. Pellentesque et fringilla lorem. In at augue malesuada, sollicitudin ex ut, convallis elit. Curabitur metus nibh, consequat vel libero sit amet, iaculis congue nisl. Maecenas eleifend sodales sapien, fringilla sagittis nisi ornare volutpat. Integer tellus enim, volutpat vitae nisl et, dignissim pharetra leo. Sed sit amet efficitur sapien, at tristique sapien. Aenean dignissim semper sagittis. Nullam sit amet volutpat mi.
Curabitur auctor orci et justo molestie iaculis. Integer elementum tortor ac ipsum egestas pharetra. Etiam ultrices elementum pharetra. Maecenas lobortis ultrices risus dignissim luctus. Nunc malesuada cursus posuere. Vestibulum tristique lectus pretium pellentesque pellentesque. Nunc ac nisi lacus. Duis ultrices dui ac viverra ullamcorper. Morbi placerat laoreet lacus sit amet ullamcorper.
Nulla convallis pulvinar hendrerit. Nulla mattis sem et aliquam ultrices. Nam egestas magna leo, nec luctus turpis sollicitudin ac. Sed id leo luctus, lobortis tortor ut, rhoncus ex. Aliquam gravida enim ac dapibus ultricies. Vestibulum at interdum est, et vehicula nibh. Phasellus dignissim iaculis rhoncus. Vestibulum tempus leo lectus, quis euismod metus ullamcorper quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut id ipsum at enim eleifend porttitor id quis metus. Proin bibendum ornare iaculis. Duis elementum lacus vel cursus efficitur. Nunc eu tortor sed risus lacinia scelerisque.
Praesent lobortis elit sit amet mauris pulvinar, viverra condimentum massa pellentesque. Curabitur massa ex, dignissim eget neque at, fringilla consectetur justo. Cras sollicitudin vel ligula sed cursus. Aliquam porta sem hendrerit diam porta ultricies. Sed eu mi erat. Curabitur id justo vel tortor hendrerit vestibulum id eget est. Morbi eros magna, placerat id diam ut, varius sollicitudin mi. Curabitur pretium finibus accumsan.`;

const MyNavScreen = ({navigation, banner}) => (
  <ScrollView navigation={navigation} style={{flex: 1}}>
    <SafeAreaView forceInset={{horizontal: 'always', top: 'aways'}}>
      <SampleText>{banner}</SampleText>
      <Button
        title='go to home tab'
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title='go to settings tab'
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title='go back'
        onPress={() => navigation.goBack(null)}
      />
      {
        TEXT.split('\n').map((text, i) => (
          <Text key={i} style={{marginVertical: 10, marginHorizontal: 8}}>
            {text}
          </Text>
        ))
      }
      <StatusBar barStyle='default'/>
    </SafeAreaView>
  </ScrollView>
) 

const MyListScreen = ({navigation, data}) => (
  <FlatList
    navigation={navigation}
    data={TEXT.split('\n')}
    style={{paddingTop: 10}}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => (
      <Text style={{fontSize: 16, marginVertical: 10, marginHorizontal: 8}}>
        {item}
      </Text>
    )}
  />
)

MyListScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused, tintColor, horizontal}) => (
    <Ionicons
      name='ios-home'
      size={horizontal ? 20 : 26}
      style={{color: tintColor}}
    />
  )
}

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Tab" navigation={navigation} />
);

MySettingsScreen.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor, focused, horizontal }) => (
    <Ionicons
      name={'ios-settings'}
      size={horizontal ? 20 : 26}
      style={{ color: tintColor }}
    />
  ),
};

class MyPeopleScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({focused, tintColor, horizontal}) => (
      <Ionicons
        name='ios-people'
        size={horizontal ? 20 : 26}
        style={{color: tintColor}}
      />
    )
  }

  render() {
    return <MyNavScreen banner='People Tab' navigation={this.props.navigation} />
  }
}

class MyChatScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarIcon: ({focused, tintColor, horizontal}) => (
      <Ionicons
        name='ios-chatboxes'
        size={horizontal ? 20 : 26}
        style={{color: tintColor}}
      />
    )
  }

  render() {
    return <MyNavScreen banner='Chat Tab' navigation={this.props.navigation} />
  }
}

const SimpleTabs = createBottomTabNavigator(
  {
    Home: {
      screen: MyListScreen,
      path: '',
    },
    People: {
      screen: MyPeopleScreen,
      path: 'cart',
    },
    Settings: {
      screen: MySettingsScreen,
      path: 'settings',
    },
    Chat: {
      screen: MyChatScreen,
      path: 'chat',
    },
  }, 
  {
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  }
)

export default class SimpleTabsContainer extends Component {
  static router = SimpleTabs.router
  render() {
    return (
      <SimpleTabs navigation={this.props.navigation}/>
    )
  }
}
