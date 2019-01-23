import _ from 'lodash'
import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Button } from 'react-native-elements';

import {SCREEN_WIDTH} from '../../utils'
import { ScrollView } from 'react-native-gesture-handler';

const USERS = [
  {
    name: 'Johh Smith',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    value: '- 164',
  },
  {
    name: 'Sarah Parker',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    value: '+ 203',
    positive: true,
  },
  {
    name: 'Paul Allen',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    value: '+ 464',
    positive: true,
  },
  {
    name: 'Terry Andrews',
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
    value: '- 80',
    positive: false,
  },
  {
    name: 'Andy Vitale',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
    value: '- 230',
    positive: false,
  },
  {
    name: 'Katy Friedson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    value: '+ 160',
    positive: true,
  },
];

export default class ListScreen1 extends Component {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: 'rgba(241,240,241,1)'
      }}>
        <View style={{height: 10}}/>
        <View style={{
          height: 60,
          width: SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            color: 'black',
            fontSize: 25,
            marginLeft: 20,
          }}>Growing</Text>
        </View>
        <ScrollView style={{flex: 1, marginBottom: 20}}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 5,
            alignItems: 'center',
            marginHorizontal: 10,
            height: 250,
            marginBottom: 10,
          }}>
            <View style={{flex: 3, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Avatar
                  size={145}
                  source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg'}}
                  avatarStyle={{borderRadius: 145/2}}
                  activeOpacity={0.7}
                  // overlayContainerStyle={{backgroundColor: 'transparent'}}
                  onPress={() => console.log('avatar')}
                />
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{color: 'rgba(98,93,144,1)', fontSize: 25, marginLeft: -15, marginTop: 10}}>Paul Allen</Text>
              </View>
            </View>
            <View
              style={{
                width: 300,
                borderWidth: 0.5,
                borderColor: 'rgba(222, 223, 226, 1)',
                marginHorizontal: 20,
                height: 1,
                marginVertical: 10,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                  title="View Profile"
                  buttonStyle={{
                    height: 33,
                    width: 120,
                    backgroundColor: 'rgba(222, 223, 226, 1)',
                    borderRadius: 5,
                  }}
                  titleStyle={{
                    fontFamily: 'regular',
                    fontSize: 13,
                    color: 'gray',
                  }}
                  onPress={() => console.log('aye')}
                  underlayColor="transparent"
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                  title="Add User"
                  buttonStyle={{
                    height: 33,
                    width: 120,
                    backgroundColor: 'rgba(113, 154, 112, 1)',
                    borderRadius: 5,
                  }}
                  titleStyle={{
                    fontFamily: 'regular',
                    fontSize: 13,
                    color: 'white',
                  }}
                  onPress={() => console.log('aye')}
                  underlayColor="transparent"
                />
              </View>
            </View>
          </View>
          {this.renderListCards()}
        </ScrollView>
      </SafeAreaView>
    )
  }

  renderListCards() {
    return _.map(USERS, (user, index) => this.renderCard(user, index))
  }

  renderCard(user, index) {
    const {name, avatar} = user
    return (
      <View
        key={index}
        style={{
          height: 60,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            small
            rounded
            source={{uri: avatar}}
            activeOpacity={0.7}
          />
          <Text style={{
            fontSize: 15,
            marginLeft: 10,
            color: 'gray'
          }}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginRight: 10}}>
          {this.renderValue(user)}
          <View
            style={{
              backgroundColor: 'rgba(222,222,222,1)',
              width: 35,
              height: 28,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}
          >
            <Icon name="md-person-add" color="gray" size={20} />
          </View>
        </View>
      </View>
    )
  }

  renderValue(user) {
    const {value, positive} = user
    return (
      <View
        style={{
          backgroundColor: positive ? 'rgba(220,230,218,1)' : 'rgba(244,230,224,1)',
          width: 70,
          height: 28,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 10,
        }}
      >
        <Icon name={positive ? "md-arrow-dropup" : "md-arrow-dropdown"} 
          color={positive ? "green" : 'red'}
          size={25} />
        <Text
          style={{
            color: positive ? "green" : 'red',
            fontFamily: 'regular',
            fontSize: 13,
            marginLeft: 5,
          }}
        >
          {value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({})
