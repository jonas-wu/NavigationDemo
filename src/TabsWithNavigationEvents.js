/**
 * @flow
 */

import React from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Event = ({event}) => (
  <View style={{
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  }}>
    <Text>{event.type}</Text>
    <Text>
      {event.action.type.replace('Navigation/', '')}
      {event.action.routeName ? '=>' + event.action.routeName : ''}
    </Text>
  </View>
)

const createTabScreen = (name, icon, focusedIcon) => {
  class TabScreen extends React.Component {
    static navigationOptions = {
      tabBarLabel: name,
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialCommunityIcons
          name={focused ? focusedIcon : icon}
          size={26}
          style={{color: focused ? tintColor: '#ccc'}}
        />
      )
    }

    state = {eventLog: []}

    append = event => this.setState(({eventLog}) => ({
      eventLog: eventLog.concat(event)
    }))

    render() {
      return (
        <SafeAreaView
          forceInset={{horizontal: 'always', top: 'always'}}
          style={{flex:1}}
        >
          <NavigationEvents
            onWillFocus={this.append}
            onDidFocus={this.append}
            onWillBlur={this.append}
            onDidBlur={this.append}
          />

          <Text style={{
            margin: 10,
            marginTop: 30,
            fontSize: 30,
            fontWeight: 'bold'
          }}>
            Events for tab {name}
          </Text>
          <View style={{flex: 1, width: '100%', marginTop: 10}}>
            <FlatList
              data={this.state.eventLog}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({item}) => (
                <View style={{
                  margin: 5,
                  backgroundColor: '#e4e4e4'
                }}>
                  <Event event={item}/>
                </View>
              )}
            />
          </View>
          <StatusBar barStyle='default'/>
        </SafeAreaView>
      )
    }
  }
  return TabScreen
}

const TabsWithNavigationEvents = createMaterialBottomTabNavigator(
  {
    One: {
      screen: createTabScreen('One', 'numeric-1-box', 'numeric-1-box'),
    },
    Two: {
      screen: createTabScreen('Two', 'numeric-2-box', 'numeric-2-box'),
    },
    Three: {
      screen: createTabScreen(
        'Three',
        'numeric-3-box',
        'numeric-3-box'
      ),
    },
  },
  {
    shifting: false,
    activeTintColor: '#F44336',
  }
);

export default TabsWithNavigationEvents;
