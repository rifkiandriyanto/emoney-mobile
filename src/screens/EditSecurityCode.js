import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: '',
    };
  }
  createPin = () => {
    this.props.navigation.navigate('create-new-pin');
  };
  render() {
    return (
      <>
        <StatusBar backgroundColor="#4C2B86" />
        <View style={style.fill}>
          <View style={style.accent2}>
            <View style={style.header}>
              <Text style={style.headerTitle}>Enter your current PIN</Text>
            </View>
            <View style={style.subtitleWrapper}>
              <Text style={style.textCaution}>
                PIN is used to log into your account and make transactions
              </Text>
            </View>
            <SmoothPinCodeInput
              codeLength={6}
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: 'gray',
              }}
              cellStyleFocused={{
                borderColor: 'black',
              }}
              value={this.state.pin}
              onTextChange={(pin) => this.setState({pin})}
            />
            <View style={style.btnTopUpWrapper}>
              <TouchableOpacity style={style.btnTopUp} onPress={this.createPin}>
                <Text style={style.btnTopUpText}>VERIFICATION</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const style = StyleSheet.create({
  fill: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  accent1: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    zIndex: 0,
  },
  accent2: {
    alignItems: 'center',
    // width: 200,
    // height: 80,
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    zIndex: 1,
  },
  header: {
    width: deviceWidth,
    backgroundColor: 'white',
    padding: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#583A8E',
  },
  subtitleWrapper: {
    marginBottom: 40,
    alignItems: 'center',
  },
  textCaution: {
    marginLeft: 25,
    marginRight: 25,
    fontSize: 14,
    textAlign: 'center',
  },
  email: {
    fontWeight: 'bold',
  },
  btnTopUpWrapper: {
    marginTop: 300,
    alignItems: 'center',
    marginBottom: 150,
  },
  btnTopUp: {
    width: deviceWidth - 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#01B0B7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTopUpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },
});
