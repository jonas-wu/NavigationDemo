import React from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';
import SampleText from './SampleText';
import Button from './commonComponents/MarginButton';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView
      forceInset={{
        top: navigation.state.routeName === 'HeaderTest' ? 'always' : 'never',
      }}
    >
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        title="Go to a profile screen"
      />
      <Button
        onPress={() => navigation.navigate('HeaderTest')}
        title="Go to a header toggle screen"
      />
      {navigation.state.routeName === 'HeaderTest' && (
        <Button
          title="Toggle Header"
          onPress={() =>
            navigation.setParams({
              headerVisible:
                !navigation.state.params ||
                !navigation.state.params.headerVisible,
            })
          }
        />
      )}
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);
MyHomeScreen.navigationOptions = {
  title: 'Welcome',
};

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}'s Profile`}
    navigation={navigation}
  />
);
MyProfileScreen.navigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.name}'s Profile!`,
});

const HeaderTestScreen = ({ navigation }) => (
  <MyNavScreen banner={`Full screen view`} navigation={navigation} />
);
HeaderTestScreen.navigationOptions = ({ navigation }) => {
  const headerVisible =
    navigation.state.params && navigation.state.params.headerVisible;
  return {
    header: headerVisible ? undefined : null,
    title: 'Now you see me',
  };
};

const ProfileNav = createStackNavigator(
  {
    Home: {screen: MyHomeScreen},
    Profile: {
      path: 'people/:name',
      screen: MyProfileScreen,
    }
  },
  {
    defaultNavigationOptions: {headerLeft: null},
    mode: 'modal',
  }
)

export default createStackNavigator(
  {
    ProfileNav: {screen: ProfileNav},
    HeaderTest: {screen: HeaderTestScreen}
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    mode: 'modal'
  }
)