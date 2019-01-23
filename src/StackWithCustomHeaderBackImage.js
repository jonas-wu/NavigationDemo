import React from 'react';
import { Image, Button, StatusBar, StyleSheet, View } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import SampleText from './SampleText';

const MyCustomHeaderBackImage = (props) => (
  <Image 
    source={require('./assets/back.png')}
    style={[
      {
        height: 14.5,
        width: 24,
        marginLeft:9,
        marginRight: 12,
        marginVertical: 12,
        resizeMode: 'contain'
      },
      props.style
    ]}/>
)

class MyNavScreen extends React.Component<MyNavScreenProps> {
  render() {
    const { navigation, banner, routeName } = this.props;
    return (
      <SafeAreaView>
        <SampleText>{banner}</SampleText>
        {
          routeName && 
          <View style={{margin: 8}}>
            <Button
              onPress={() => navigation.navigate(routeName, { name: 'Jane' })}
              title={"Navigate to " + routeName}
            />
          </View>
        }
        <View style={{margin: 8}}>
          <Button onPress={() => navigation.goBack(null)} title="Go back"/>
        </View>        
        <StatusBar barStyle="default" />
      </SafeAreaView>
    );
  }
}

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    headerBackTitle: null,
  }

  render() {
    const {navigation} = this.props
    return <MyNavScreen banner='Home Screen' navigation={navigation} routeName='Photos'/>
  }
}

class MyPhotosScreen extends React.Component {
  static navigationOptions =({navigation}) => ({
    title: `${navigation.state.params.name}'s photos`,
    headerBackTitle: null,
  })

  render() {
    const {navigation} = this.props
    return <MyNavScreen banner={`${navigation.state.params.name}'s photos`} navigation={navigation} routeName='Profile'/>
  }
}

class MyProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.getParam('name', 'Unknown')}'s profile`,
    headerBackImage: <MyCustomHeaderBackImage style={{tintColor: '#f00'}}/>,
  })

  render() {
    const {navigation} = this.props
    return <MyNavScreen banner={`${navigation.getParam('name', 'Unknown')}'s profile`} navigation={navigation}/>
  }
}

const StackWithCustomHeaderBackImage = createStackNavigator(
  {
    Home: {
      screen: MyHomeScreen
    },
    Photos: {
      path: 'photos/:name',
      screen: MyPhotosScreen,
    },
    Profile: {
      path: 'profile/:name',
      screen: MyProfileScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerBackImage: MyCustomHeaderBackImage,
    }
  }
)

export default StackWithCustomHeaderBackImage;