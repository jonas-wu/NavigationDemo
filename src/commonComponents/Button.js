import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export default class Button extends Component {
  render() {
    const {
      accessibilityLabel,
      color,
      onPress,
      title,
      hasTVPreferredFocus,
      disabled,
      testID,
    } = this.props;
  
    const buttonStyles = [styles.button]
    const textStyles = [styles.text]
    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color})
      } else {
        buttonStyles.push({backgroundColor: color})
      }
    }
    const accessibilityStates = [];
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityStates.push('disabled');
    }
    const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title;
    const Touchable = Platform.OS === 'android' ? RectButton : BorderlessButton;

    return (
      <Touchable
        accessibilityLabel={accessibilityLabel}
        accessibilityStates={accessibilityStates}
        hasTVPreferredFocus={hasTVPreferredFocus}
        accessibilityRole="button"
        testID={testID}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyles}>
          <Text style={textStyles} disabled>
            {formattedTitle}
          </Text>
        </View>
      </Touchable>
    )
  }
}


const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2,
    }
  }),
  text: {
    textAlign: 'center',
    padding: 8,
    ...Platform.select({
      ios: {
        // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
        color: '#007AFF',
        fontSize: 18,
      },
      android: {
        color: 'white',
        fontWeight: '500',
      },
    })
  },
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    },
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd',
    },
    android: {
      color: '#a1a1a1',
    },
  }),
})