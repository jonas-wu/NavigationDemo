import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View,
} from 'react-native';
import {
  RectButton,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import {
  createAppContainer,
  SafeAreaView,
  createStackNavigator,
} from 'react-navigation';
import { Assets as StackAssets } from 'react-navigation-stack';

import SimpleStack from './SimpleStack'
import SwitchWithStacks from './SwitchWithStacks'
import SimpleTabs from './SimpleTabs'
import Drawer from './Drawer'
import StackWithCustomHeaderBackImage from './StackWithCustomHeaderBackImage'
import StackWithHeaderPreset from './StackWithHeaderPreset'
import StackWithTranslucentHeader from './StackWithTranslucentHeader'
import TabsInDrawer from './TabsInDrawer'
import CustomTabs from './CustomTabs'
import CustomTransitioner from './CustomTransitioner'
import ModalStack from './ModalStack'
import StacksWithKeys from './StacksWithKeys'
import StacksInTabs from './StacksInTabs'
import CustomTabUI from './CustomTabUI'
import StacksOverTabs from './StacksOverTabs'
import StacksOverTopTabs from './StacksOverTopTabs'
import TabsWithNavigationFocus from './TabsWithNavigationFocus'
import TabsWithNavigationEvents from './TabsWithNavigationEvents'
import KeyboardHandlingExample from './KeyboardHandlingExample'

const ExampleInfo = {
  SimpleStack: {
    name: 'Stack Example',
    description: 'A card stack',
  },
  SwitchWithStacks: {
    name: 'Switch between routes',
    description: 'Jump between routes',
  },
  SimpleTabs: {
    name: 'Tabs Example',
    description: 'Tabs following platform conventions',
  },
  Drawer: {
    name: 'Drawer Example',
    description: 'Android-style drawer navigation',
  },
  StackWithCustomHeaderBackImage: {
    name: 'Custom header back image',
    description: 'Stack with custom header back image',
  },
  StackWithTranslucentHeader: {
    name: 'Translucent Header',
    description: 'Render arbitrary translucent content in header background.',
  },
  // MultipleDrawer: {
  //   name: 'Multiple Drawer Example',
  //   description: 'Add any drawer you need',
  // },
  TabsInDrawer: {
    name: 'Drawer + Tabs Example',
    description: 'A drawer combined with tabs',
  },
  CustomTabs: {
    name: 'Custom Tabs',
    description: 'Custom tabs with tab router',
  },
  CustomTransitioner: {
    name: 'Custom Transitioner',
    description: 'Custom transitioner with stack router',
  },
  ModalStack: {
    name:
      Platform.OS === 'ios'
        ? 'Modal Stack Example'
        : 'Stack with Dynamic Header',
    description:
      Platform.OS === 'ios'
        ? 'Stack navigation with modals'
        : 'Dynamically showing and hiding the header',
  },
  StacksInTabs: {
    name: 'Stacks in Tabs',
    description: 'Nested stack navigation in tabs',
  },
  StacksOverTabs: {
    name: 'Stacks over Tabs',
    description: 'Nested stack navigation that pushes on top of tabs',
  },
  StacksOverTopTabs: {
    name: 'Stacks with non-standard header height',
    description: 'Tab navigator in stack with custom header heights',
  },
  StacksWithKeys: {
    name: 'Link in Stack with keys',
    description: 'Use keys to link between screens',
  },
  LinkStack: {
    name: 'Link in Stack',
    description: 'Deep linking into a route in stack',
  },
  LinkTabs: {
    name: 'Link to Settings Tab',
    description: 'Deep linking into a route in tab',
  },
  TabsWithNavigationFocus: {
    name: 'withNavigationFocus',
    description: 'Receive the focus prop to know when a screen is focused',
  },
  TabsWithNavigationEvents: {
    name: 'NavigationEvents',
    description:
      'Declarative NavigationEvents component to subscribe to navigation events',
  },
  KeyboardHandlingExample: {
    name: 'Keyboard Handling Example',
    description:
      'Demo automatic handling of keyboard showing/hiding inside StackNavigator',
  },
  CustomTabUI: {
    name: 'Custom Tabs UI',
    description: 'Render additional views around a Tab navigator',
  },
}

const ExampleRoutes = {
  SimpleStack,
  SwitchWithStacks,
  SimpleTabs,
  Drawer,
  StackWithCustomHeaderBackImage,
  ...Platform.select({
    ios: {StackWithHeaderPreset},
    android: {}
  }),
  StackWithTranslucentHeader,
  TabsInDrawer,
  CustomTabs,
  CustomTransitioner,
  ModalStack,
  StacksWithKeys,
  StacksInTabs,
  CustomTabUI,
  StacksOverTabs,
  StacksOverTopTabs,
  LinkStack: {
    screen: SimpleStack,
    path: 'people/Jordan',
  },
  LinkTabs: {
    screen: SimpleTabs,
    path: 'settings',
  },
  TabsWithNavigationFocus,
  TabsWithNavigationEvents,
  KeyboardHandlingExample,
}

class MainScreen extends Component {
  state = {
    scrollY: new Animated.Value(0)
  }

  render() {
    const {navigation} = this.props
    const {scrollY} = this.state
    console.log('scrollY', scrollY._value);

    const scale = scrollY.interpolate({
      inputRange: [-450, 0, 100],
      outputRange: [2, 1, 0.8],
      extrapolate: 'clamp'
    })
    // console.log('scale', scale);

    const translateY = scrollY.interpolate({
      inputRange: [-450, 0, 100],
      outputRange: [-150, 0, 40],
    })
    console.log('translateY', translateY._value);

    const opacity = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    console.log('opacity', opacity._value);

    const underlayOpacity = scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    console.log('underlayOpacity', underlayOpacity._value);

    const backgroundScale = scrollY.interpolate({
      inputRange: [-450, 0],
      outputRange: [3, 1],
      extrapolate: 'clamp',
    });
    console.log('backgroundScale', backgroundScale._value);

    const backgroundTranslateY = scrollY.interpolate({
      inputRange: [-450, 0],
      outputRange: [0, 0],
    });
    console.log('backgroundTranslateY', backgroundTranslateY._value);

    return (
      <View style={{flex: 1}}>
        <NativeViewGestureHandler>
          <Animated.ScrollView
            style={{flex: 1, backgroundColor: '#eee'}}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true}
            )}
          >
            <Animated.View style={[
              {
                backgroundColor: '#673ab7',
                position: 'absolute',
                top: -100,
                height: 300,
                left: 0,
                right: 0,
              }, {
                transform: [
                  {scale: backgroundScale},
                  {translateY: backgroundTranslateY}
                ]
              }
            ]}/>
            <Animated.View style={{opacity, transform: [{scale}, {translateY}]}}>
              <SafeAreaView
                style={{alignItems: 'center'}}
                forceInset={{top: 'always', bottom: 'never'}}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
                  <Image
                    source={require('./assets/NavLogo.png')}
                    style={{
                      width: 36,
                      height: 36,
                      resizeMode: 'contain',
                      tintColor: '#fff',
                      margin: 8,
                    }}
                  />
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '200',
                    color: '#fff',
                    marginVertical: 8,
                    marginRight: 5,
                  }}>
                    React Navigation Examples
                  </Text>
                </View>
              </SafeAreaView>
            </Animated.View>
            <SafeAreaView forceInset={{top: 'never', bottom: 'always'}}
              style={{backgroundColor: '#eee'}}>
              <View style={{backgroundColor: '#fff'}}>
                {
                  Object.keys(ExampleRoutes).map(routeName => (
                    <RectButton
                      key={routeName}
                      underlayColor='red'
                      activeOpacity={0.3}
                      onPress={() => {
                        let route = ExampleRoutes[routeName]
                        // console.log('route', route);
                        if (route.screen || route.path || route.params) {
                          const { path, params, screen } = route;
                          const { router } = screen;
                          const action = path && router.getActionForPathAndParams(path, params)
                          console.log('path', path);
                          console.log('params', params);
                          console.log('screen', screen);
                          console.log('router', router);
                          console.log('action', action);
                          navigation.navigate(routeName, {}, action)
                        } else {
                          console.log('routeName', routeName);
                          navigation.navigate(routeName)
                        }
                      }}
                    >
                      <View style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: 'blue',
                      }}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#444',
                        }}>
                          {ExampleInfo[routeName].name}
                        </Text>
                        <Text style={{
                          fontSize: 13,
                          color: '#999',
                        }}>
                          {ExampleInfo[routeName].description}
                        </Text>
                      </View>
                    </RectButton>
                  ))
                }
              </View>
            </SafeAreaView>
          </Animated.ScrollView>
        </NativeViewGestureHandler>
        <StatusBar barStyle='light-content'/>
        <Animated.View style={[{
          backgroundColor: '#673ab7',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: StatusBar.currentHeight,
        }]}/>
      </View>
    )
  }
}

const AppNavigator = createAppContainer(
  createStackNavigator({
    ...ExampleRoutes,
    Index: {
      screen: MainScreen,
    }
  }, {
    initialRouteName: 'Index',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  })
)

export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    )
  }
}



const styles = StyleSheet.create({})
