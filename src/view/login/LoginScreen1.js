import React, { Component } from 'react'
import { 
  Text, View, Dimensions, ImageBackground, KeyboardAvoidingView,LayoutAnimation,
  UIManager, StyleSheet,
} from 'react-native'
import { Button, Input, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const BG_IMAGE = require('../../../assets/images/bg_screen4.jpg')

const TabSelector = ({selected}) => (
  <View style={{backgroundColor: 'blue'}}>
    <View style={selected && styles.selected}/>
  </View>
)

export default class LoginScreen1 extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    selectedTab: 0,
    isLoading: false,
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmationValid: true,
  }

  emailInput = React.createRef()
  passwordInput = React.createRef()
  passwordConfirmInput = React.createRef()

  componentDidMount() {
    
  }

  render() {
    const {
      isLoading,
      selectedTab,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state
    const isLoginTab = selectedTab === 0
    console.log('render selectedTab', selectedTab, isLoginTab)

    return (
      <View style={{flex: 1,}}>
        <ImageBackground source={BG_IMAGE} style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
        }}>
          <View>
            <KeyboardAvoidingView behavior='position' style={{
              // backgroundColor: 'grey', 
              alignItems: 'center',
            }}>
              <View style={{height: 150, alignItems: 'center',}}>
                <Text style={styles.titleText}>BEAUX</Text>
                <Text style={[styles.titleText, {marginTop: -10, marginLeft: 10,}]}>VOYAGES</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Button 
                  disabled={isLoading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectTab(0)}
                  title='Login'
                  titleStyle={[
                    styles.tabText,
                    isLoginTab && styles.selectedTabText
                  ]}
                />
                <Button 
                  disabled={isLoading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectTab(1)}
                  title='Sign up'
                  titleStyle={[
                    styles.tabText,
                    (!isLoginTab) && styles.selectedTabText
                  ]}
                />
              </View>
              <View style={{height: 20, flexDirection: 'row', alignItems: 'center',}}>
                <TabSelector selected={isLoginTab}/>
                <TabSelector selected={!isLoginTab}/>
                <Text>aaaaa</Text>
              </View>
              <View style={{
                backgroundColor: 'white', 
                width: SCREEN_WIDTH - 30, 
                borderRadius: 10,
                alignItems: 'center',
                paddingTop: 32,
                paddingBottom: 32,
              }}>
                <Input 
                  leftIcon={
                    <Icon
                      name='envelope-o'
                      color='rgba(0,0,0,0.38)'
                      size={25}
                      style={{}}
                    />
                  }
                  value={email}
                  autoFocus={false}
                  keyboardType='email-address'
                  returnKeyType='next'
                  inputStyle={{marginLeft: 10}}
                  placeholder='Email'
                  containerStyle={{borderBottomColor: 'rgba(0,0,0,0.38)'}}
                  onChangeText={email => this.setState({email})}
                  errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
                  ref={this.emailInput}
                  onSubmitEditing={() => this.passwordInput.current.focus()}
                />
                <Input 
                  leftIcon={
                    <Icon
                      name='lock'
                      color='rgba(0,0,0,0.38)'
                      size={25}
                      style={{}}
                    />
                  }
                  value={password}
                  autoFocus={false}
                  keyboardType='default'
                  secureTextEntry={true}
                  blurOnSubmit={true}
                  returnKeyType='next'
                  inputStyle={{marginLeft: 10}}
                  placeholder='Password'
                  containerStyle={{
                    borderBottomColor: 'rgba(0,0,0,0.38)',
                    marginTop: 16,
                  }}
                  onChangeText={password => this.setState({password})}
                  errorMessage={isPasswordValid ? null : 'Please enter at least 8 characters'}
                  ref={this.emailInput}
                  onSubmitEditing={() => this.passwordInput.current.focus()}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    )
  }

  selectTab(index) {
    console.log('selectTab', index)
    this.setState({selectedTab: index})
  }
}


const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  tabText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    opacity: 0.54,
  },
  selectedTabText: {
    opacity: 1,
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  }
})