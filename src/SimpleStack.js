import type {
  NavigationScreenProp,
  NavigationState,
  NavigationStateRoute,
  NavigationEventSubscription,
} from 'react-navigation';

import React, {Component} from 'react';
import { Platform, ScrollView, StatusBar } from 'react-native';
import {
  createStackNavigator,
  SafeAreaView,
  withNavigation,
  NavigationActions,
  StackActions,
} from 'react-navigation';

import SampleText from './SampleText'
import HeaderButtons from './commonComponents/HeaderButtons'
import Button from './commonComponents/MarginButton'

const DEBUG = true

class MyNavScreen extends Component {
  render() {
    const { navigation, banner } = this.props;
    const { push, replace, popToTop, pop, dismiss } = navigation;
    // console.log('MyNavScreen navigation', navigation)
    return (
      <SafeAreaView forceInset={{top: 'never'}}>
        <SampleText>{banner}</SampleText>
        <Button
          title='Push a profile screen'
          onPress={() => push('Profile', {name: 'Jane'})}
        />
        <Button
          title='Reset photos'
          onPress={() => navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Photos',
                  params: {name: 'Jane'}
                })
              ]
            })
          )}
        />
        <Button
          title='Navigate to photos'
          onPress={() => navigation.navigate('Photos', {name: 'Jane'})}
        />
        <Button
          title='popToTop'
          onPress={() => navigation.popToTop()}
        />
        <Button
          title='pop'
          onPress={() => navigation.pop()}
        />
        <Button
          title='Go back'
          onPress={() => {
            if (!navigation.goBack()) {
              console.log('goback unhandled')
            }
          }}
        />
        <Button
          title='dismiss'
          onPress={() => navigation.dismiss()}
        />
        <StatusBar barStyle='default'/>
      </SafeAreaView>
    )
  }
}

class MyHomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  _s0: NavigationEventSubscription;
  _s1: NavigationEventSubscription;
  _s2: NavigationEventSubscription;
  _s3: NavigationEventSubscription;

  componentDidMount() {
    const {navigation} = this.props
    this._s0 = navigation.addListener('willFocus', this._willFocus)
    this._s1 = navigation.addListener('didFocus', this._didFocus)
    this._s2 = navigation.addListener('willBlur', this._willBlur)
    this._s3 = navigation.addListener('didBlur', this._didBlur)
  }

  componentWillUnmount() {
    this._s0.remove()
    this._s1.remove()
    this._s2.remove()
    this._s3.remove()
  }

  _willFocus = payload => DEBUG && console.log('_willFocus', payload.type)

  _didFocus = payload => DEBUG && console.log('_didFocus', payload.type)

  _willBlur = payload => DEBUG && console.log('_willBlur', payload.type)

  _didBlur = payload => DEBUG && console.log('_didBlur', payload.type)

  render() {
    const {navigation} = this.props
    return <MyNavScreen banner='Home Screen' navigation={navigation}/>
  }
}

class MyBackButton extends Component {
  _navigateBack = () => this.props.navigation.goBack(null)

  render() {
    return (
      <HeaderButtons>
        <HeaderButtons.Item title='Back' onPress={this._navigateBack}/>
      </HeaderButtons>
    )
  }
} 

const MyBackButtonWithNavi = withNavigation(MyBackButton)

class MyPhotosScreen extends Component {
  static navigationOptions = {
    title: 'Photos',
    headerLeft: <MyBackButtonWithNavi/>
  }

  _s0: NavigationEventSubscription;
  _s1: NavigationEventSubscription;
  _s2: NavigationEventSubscription;
  _s3: NavigationEventSubscription;

  componentDidMount() {
    const {navigation} = this.props
    this._s0 = navigation.addListener('willFocus', this._willFocus)
    this._s1 = navigation.addListener('didFocus', this._didFocus)
    this._s2 = navigation.addListener('willBlur', this._willBlur)
    this._s3 = navigation.addListener('didBlur', this._didBlur)
  }

  componentWillUnmount() {
    this._s0.remove()
    this._s1.remove()
    this._s2.remove()
    this._s3.remove()
  }

  _willFocus = payload => DEBUG && console.log('_willFocus', payload.type)

  _didFocus = payload => DEBUG && console.log('_didFocus', payload.type)

  _willBlur = payload => DEBUG && console.log('_willBlur', payload.type)

  _didBlur = payload => DEBUG && console.log('_didBlur', payload.type)

  render() {
    const {navigation} = this.props
    return <MyNavScreen 
      banner={`${navigation.getParam('name')}'s Photos`} 
      navigation={navigation}
    />
  }
}

const MyProfileScreen = ({navigation}) => (
  <MyNavScreen
    banner={`${navigation.getParam('mode') === 'edit' ? 'Now Editing ' : ''}
    ${navigation.getParam('name')}'s Profile`}
    navigation={navigation}
  />
)

MyProfileScreen.navigationOptions = ({navigation}) => {
  const { state, setParams } = navigation;
  const { params } = state;
  console.log('MyProfileScreen params', params);
  return {
    headerBackImage: params.headerBackImage,
    headerTitle: `${params.name}'s Profile`,
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.Item
          title={params.mode === 'edit' ? 'Done' : 'Edit'}
          onPress={() => setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
        />
      </HeaderButtons>
    )
  }
}

const SimpleStack = createStackNavigator(
  {
    Home: {
      screen: MyHomeScreen
    },
    Profile: {
      path: 'people/:name',
      screen: MyProfileScreen,
    },
    Photos: {
      path: 'photos/:name',
      screen: MyPhotosScreen,
    }
  }
)

export default SimpleStack