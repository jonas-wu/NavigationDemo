import React, { Component } from 'react'
import {
  Text, StyleSheet, View, SafeAreaView, StatusBar, ScrollView,
  Image, 
} from 'react-native'
import {Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

import {SCREEN_WIDTH} from '../../utils'

const IMAGE_SIZE = SCREEN_WIDTH-80

export default class ProfileScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle='light-content'/>
        <View style={{flex: 1, backgroundColor: 'rgba(47,44,60,1)'}}>
          <View style={{height: 10, }}/>
          <View style={{height: 60, width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 22}}>Theresa, 26</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image 
                source={{uri: 'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg'}}
                style={{
                  width: IMAGE_SIZE, 
                  height: IMAGE_SIZE, 
                  borderRadius: 10
                }}/>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{flex: 1, fontSize: 26, color: 'white', fontWeight: 'bold'}}>Theresa</Text>
              <Text style={{flex: 0.5, fontSize: 15, color: 'grey', marginTop: 5}}>0.8 mi</Text>
              <Text style={{flex: 1, fontSize: 26, color: 'green', fontWeight: 'bold', textAlign: 'right'}}>84%</Text>
            </View>
            <View style={{
              flex: 1,
              marginTop: 20,
              width: SCREEN_WIDTH - 80,
              marginLeft: 40,
            }}>
              <Text style={{fontSize: 15, color: 'white', fontFamily: 'regular'}}>
                100% Italian, fun loving, affectionate, young lady who knows
                what it takes to make a relationship work.
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 30}}>
              <Text style={{
                fontSize: 15, 
                color: 'rgba(216, 121, 112, 1)', 
                fontFamily: 'regular', 
                marginLeft: 40,
              }}>
                Interests
              </Text>
              <View style={{flex: 1, width: '100%', marginTop: 20}}>
                <ScrollView
                  style={{flex: 1}}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                >
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    height: 170,
                    marginLeft: 40,
                    marginRight: 10
                  }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <CustomButton title='Philosophy' selected={true}/>
                      <CustomButton title='Sport'/>
                      <CustomButton title='Swimming' selected={true}/>
                      <CustomButton title='Religion'/>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <CustomButton title="Music" />
                      <CustomButton title="Soccer" selected={true} />
                      <CustomButton title="Radiohead" selected={true} />
                      <CustomButton title="Micheal Jackson" />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <CustomButton title="Travelling" selected={true} />
                      <CustomButton title="Rock'n'Roll" />
                      <CustomButton title="Dogs" selected={true} />
                      <CustomButton title="France" selected={true} />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={{flex: 1, marginTop: 30}}>
              <Text style={{
                fontSize: 15, 
                color: 'rgba(216, 121, 112, 1)', 
                fontFamily: 'regular', 
                marginLeft: 40,
              }}>
                Info
              </Text>
              <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 30,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoTypeLabel}>Age</Text>
                  <Text style={styles.infoTypeLabel}>Height</Text>
                  <Text style={styles.infoTypeLabel}>Ethnicity</Text>
                  <Text style={styles.infoTypeLabel}>Sign</Text>
                  <Text style={styles.infoTypeLabel}>Religion</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.infoAnswerLabel}>26</Text>
                  <Text style={styles.infoAnswerLabel}>5'4"</Text>
                  <Text style={styles.infoAnswerLabel}>White</Text>
                  <Text style={styles.infoAnswerLabel}>Pisces</Text>
                  <Text style={styles.infoAnswerLabel}>Catholic</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoTypeLabel}>Body Type</Text>
                  <Text style={styles.infoTypeLabel}>Diet</Text>
                  <Text style={styles.infoTypeLabel}>Smoke</Text>
                  <Text style={styles.infoTypeLabel}>Drink</Text>
                  <Text style={styles.infoTypeLabel}>Drugs</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10, marginRight: 0 }}>
                  <Text style={styles.infoAnswerLabel}>Fit</Text>
                  <Text style={styles.infoAnswerLabel}>Vegan</Text>
                  <Text style={styles.infoAnswerLabel}>No</Text>
                  <Text style={styles.infoAnswerLabel}>No</Text>
                  <Text style={styles.infoAnswerLabel}>Never</Text>
                </View>
              </View>
            </View>
            <Button
              containerStyle={{ marginVertical: 20, marginHorizontal: 20 }}
              buttonStyle={{
                height: 55,
                width: '100%',
                borderRadius: 30,
              }}
              title="Message Theresa"
              titleStyle={{
                fontFamily: 'regular',
                fontSize: 20,
                color: 'white',
              }}
              onPress={() => console.log('Message Theresa')}
              activeOpacity={0.5}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['rgba(214,116,112,1)', 'rgba(233,174,87,1)'],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

class CustomButton extends Component {
  state = {
    selected: this.props.selected
  }

  render() {
    const {title} = this.props
    const {selected} = this.state

    return (
      <Button
        title={title}
        titleStyle={{fontSize: 15, color: 'white', fontFamily: 'regular'}}
        buttonStyle={{
          borderRadius: 30,
          borderWidth: 1,
          borderColor: 'white',
          width: 127,
          backgroundColor: selected ? 'rgba(213, 100, 140, 1)' : 'transparent',
        }}
        containerStyle={{marginRight: 10}}
        onPress={() => this.setState({selected: !selected})}
      />
    )
  }
}


const styles = StyleSheet.create({
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
})
