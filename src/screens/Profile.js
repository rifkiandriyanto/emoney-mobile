import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {connect} from 'react-redux';
import {logout} from '../redux/actions/auth';
import {getUserById} from '../redux/actions/users';

const deviceWidth = Dimensions.get('screen').width;
// const deviceHeight = Dimensions.get('screen').height;

class Profile extends Component {
  editProfile = () => {
    this.props.navigation.navigate('editProfile');
  };
  logoutModal = () => {
    Alert.alert(
      'Are you sure?',
      "You'll leave me alone :(",
      [
        {
          text: '',
          // onPress: () => console.log('Ask me later pressed')
        },
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: this.logout,
        },
      ],
      {cancelable: false},
    );
  };
  state = {
    full_name: '',
    phone_number: '',
    image: null,
  };
  logout = () => {
    this.props.logout();
    this.props.navigation.navigate('login');
  };

  editSecurityCode = () => {
    this.props.navigation.navigate('editSecurity');
  };

  componentDidMount() {
    this.props
      .getUserById(
        this.props.auth.dataLogin.id,
        this.props.auth.dataLogin.token,
      )
      .then((val) => {
        this.setState({
          full_name: val.value.data.data[0].full_name,
          phone_number: val.value.data.data[0].phone_number,
          image: val.value.data.data[0].image,
        });
      });
  }

  render() {
    const {full_name, phone_number, image} = this.state;
    return (
      <>
        <StatusBar backgroundColor="#4C2B86" />
        <ScrollView
          style={style.fill}
          refreshControl={
            <RefreshControl
              refreshing={this.props.auth.isLoading}
              onRefresh={() => {
                this.props
                  .getUserById(
                    this.props.auth.dataLogin.id,
                    this.props.auth.dataLogin.token,
                  )
                  .then((val) => {
                    this.setState({
                      full_name: val.value.data.data[0].full_name,
                      phone_number: val.value.data.data[0].phone_number,
                      image: val.value.data.data[0].image,
                    });
                  });
              }}
            />
          }>
          <View style={style.content}>
            <View style={{...{flex: 1}}}>
              <View style={style.profile}>
                <Text style={style.header}>Profile</Text>
                <View style={style.contentProfile}>
                  <View style={style.imageWrapper}>
                    <Image source={{uri: image}} style={style.image} />
                  </View>
                  <View style={style.textProfile}>
                    <Text style={style.name}>{full_name}</Text>
                    <Text style={style.phone}>{phone_number}</Text>
                  </View>
                </View>
              </View>
              <View style={style.contentBadge}>
                <View style={style.account}>
                  <Text style={style.textBadge}>Account</Text>
                  <TouchableOpacity
                    onPress={this.editProfile}
                    style={style.list}>
                    <Icon name="user-edit" size={22} />
                    <Text style={style.title}>Update Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={style.contentBadge}>
                <View style={style.account}>
                  <Text style={style.textBadge}>Security</Text>
                  <TouchableOpacity onPress={this.editSecurityCode} style={style.list}>
                    <Text style={style.title}>Ubah Security Code</Text>
                  </TouchableOpacity>
                </View>
              </View> */}
              <View style={style.contentBadge}>
                <View style={style.account}>
                  <Text style={style.textBadge}>About</Text>
                  <TouchableOpacity style={style.list}>
                    <Icon Regular name="address-book" size={22} />
                    <Text style={style.title}>Terms and Conditions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={this.logoutModal} style={style.button}>
              <Text style={style.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {logout, getUserById};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const style = StyleSheet.create({
  fill: {
    backgroundColor: '#ECE9F6',
    flex: 1,
  },
  content: {
    alignSelf: 'stretch',
    margin: 20,
    marginTop: 70,
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  contentProfile: {
    marginTop: 20,
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textProfile: {
    flex: 1,
    fontSize: 14,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  phone: {
    color: '#AAAAAA',
    fontSize: 20,
  },
  contentBadge: {
    margin: -5,
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
    width: deviceWidth - 33,
    // height: deviceHeight,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  account: {
    marginTop: 10,
    marginBottom: 15,
  },
  textBadge: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  list: {
    alignSelf: 'stretch',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  button: {
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor: '#01B0B7',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
