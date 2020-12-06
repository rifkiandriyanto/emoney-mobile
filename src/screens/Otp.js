import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {connect} from 'react-redux';
import {verifyUser} from '../redux/actions/auth';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.email,
      otp: '',
    };
  }
  verify = () => {
    const dataSubmit = {
      otp: this.state.otp,
    };

    this.props
      .verifyUser(dataSubmit)
      .then(() => {
        this.props.navigation.navigate('login');
        Alert.alert('Success!', "You're now verified");
      })
      .catch(function () {
        Alert.alert('Invalid OTP!');
      });
  };
  render() {
    const {isLoading} = this.props.auth;

    return (
      <>
        <StatusBar backgroundColor="#4C2B86" />
        <View style={style.fill}>
          <View style={style.accent2}>
            <View style={style.header}>
              <Text style={style.headerTitle}>Enter OTP Code</Text>
            </View>
            <View style={style.subtitleWrapper}>
              <Text>
                We've sent the OTP code to your email. Please check you inbox or
                spam
              </Text>
              <Text style={style.email}>{this.state.email}</Text>
            </View>
            <SmoothPinCodeInput
              cellStyle={{
                borderBottomWidth: 2,
                borderColor: 'gray',
              }}
              cellStyleFocused={{
                borderColor: 'black',
              }}
              value={this.state.otp}
              onTextChange={(otp) => this.setState({otp})}
            />
            <View style={style.btnTopUpWrapper}>
              <TouchableOpacity style={style.btnTopUp} onPress={this.verify}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text style={style.btnTopUpText}>VERIFICATION</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {verifyUser};

export default connect(mapStateToProps, mapDispatchToProps)(Otp);

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
    width: 200,
    height: 80,
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
    letterSpacing: 2,
    color: '#583A8E',
  },
  subtitleWrapper: {
    marginBottom: 40,
    alignItems: 'center',
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
