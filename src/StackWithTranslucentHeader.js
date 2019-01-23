import { isIphoneX } from 'react-native-iphone-x-helper';

import * as React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Header,
  HeaderStyleInterpolator,
  createStackNavigator,
} from 'react-navigation';

import SampleText from './SampleText';
import Button from './commonComponents/MarginButton';
import HeaderButtons from './commonComponents/HeaderButtons';

class MyNavScreen extends React.Component {
  render() {
    const { navigation, banner } = this.props;
    const { push, replace, popToTop, pop } = navigation;

    return (
      <ScrollView style={{ flex: 1 }} {...this.getHeaderInset()}>
        <SampleText>{banner}</SampleText>
        <Button
          onPress={() => push('Profile', { name: 'Jane' })}
          title="Push a profile screen"
        />
        <Button
          onPress={() => navigation.navigate('Photos', { name: 'Jane' })}
          title="Navigate to a photos screen"
        />
        <Button
          onPress={() => replace('Profile', { name: 'Lucy' })}
          title="Replace with profile"
        />
        <Button onPress={() => popToTop()} title="Pop to top" />
        <Button onPress={() => pop()} title="Pop" />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
        <StatusBar barStyle="default" />
      </ScrollView>
    );
  }

  getHeaderInset() {
    const NOTCH_HEIGHT = isIphoneX() ? 25 : 0
    const HEADER_HEIGHT = Platform.OS === 'ios' ? Header.HEIGHT + NOTCH_HEIGHT : Header.HEIGHT + StatusBar.currentHeight
    console.log(`Header.HEIGHT=${Header.HEIGHT} StatusBar.currentHeight=${StatusBar.currentHeight}`);
    return Platform.select({
      ios: {
        contentInset: {top: HEADER_HEIGHT},
        contentOffset: {y: -HEADER_HEIGHT},
      },
      android: {
        contentContainerStyle: {
          paddingTop: HEADER_HEIGHT
        }
      }
    })
  }
}

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  render() {
    const { navigation } = this.props;
    return <MyNavScreen banner="Home Screen" navigation={navigation} />;
  }
}

class MyPhotosScreen extends React.Component<MyPhotosScreenProps> {
  static navigationOptions = {
    title: 'Photos',
  }

  render() {
    const { navigation } = this.props;
    return (
      <MyNavScreen
        banner={`${navigation.getParam('name')}'s Photos`}
        navigation={navigation}
      />
    );
  }
}

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.mode === 'edit' ? 'Now Editing ' : ''}${
      navigation.state.params.name
    }'s Profile`}
    navigation={navigation}
  />
);

const StackWithTranslucentHeader = createStackNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    Profile: {
      path: 'people/:name',
      screen: MyProfileScreen,
    },
    Photos: {
      path: 'photos/:name',
      screen: MyPhotosScreen,
    },
  },
  {
    headerTransitionPreset: 'uikit',
    transitionConfig: () => ({
      headerBackgroundInterpolator: HeaderStyleInterpolator.forBackgroundWithTranslation
    }),
    defaultNavigationOptions: {
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#a7a7aa'
      },
      headerBackground: <View style={{flex: 1, backgroundColor: 'rgba(0,255,255,0.7)'}}/>
    }
  }
)

export default StackWithTranslucentHeader