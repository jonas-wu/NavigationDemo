import React from 'react';
import { StatusBar, View, TextInput, InteractionManager } from 'react-native';
import { createStackNavigator, withNavigationFocus } from 'react-navigation';
import Button from './commonComponents/MarginButton';

class ScreenOne extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ paddingTop: 30 }}>
        <Button
          onPress={() => navigation.push('ScreenTwo')}
          title="Push screen with focused text input"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go Home" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class ScreenTwo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('inputValue', 'Screen w/ Input'),
  });

  componentDidMount() {
    console.log('componentDidMount', Date.now());
    InteractionManager.runAfterInteractions(() => {
      this._textInput.focus();
      console.log('runAfterInteractions', Date.now());
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ paddingTop: 30 }}>
        <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
          <TextInput
            ref={c => this._textInput = c}
            onChangeText={inputValue => navigation.setParams({ inputValue })}
            style={{
              backgroundColor: 'white',
              height: 34,
              width: 150,
              borderColor: '#555',
              borderWidth: 1,
            }}
            // autoFocus={true}
          />
        </View>
        <Button onPress={() => navigation.pop()} title="Pop" />
      </View>
    );
  }
}

export default createStackNavigator({
  ScreenOne,
  ScreenTwo: withNavigationFocus(ScreenTwo),
});
