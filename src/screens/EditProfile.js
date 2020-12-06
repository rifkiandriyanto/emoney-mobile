import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {logout} from '../redux/actions/auth';
import {patchUser, getUserById} from '../redux/actions/users';
import {connect} from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    console.log('ini props', props);
    this.state = {
      token: this.props.auth.dataLogin.token,
      msg: '',
      fullName: '',
      phoneNumber: '',
      photo: null,
      fileUri: '',
    };
  }

  componentDidMount() {
    this.props
      .getUserById(
        this.props.auth.dataLogin.id,
        this.props.auth.dataLogin.token,
      )
      .then((val) => {
        console.log(val);
        this.setState({
          fullName: val.value.data.data[0].full_name,
          phoneNumber: val.value.data.data[0].phone_number,
          fileUri: val.value.data.data[0].image,
        });
      });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      if (response.uri) {
        this.setState({
          photo: {
            name: response.fileName,
            type: response.type,
            uri:
              Platform.OS === 'android'
                ? response.uri
                : response.uri.replace('file://', ''),
          },
        });
      }
    });
  };

  submit = (e) => {
    e.preventDefault();
    console.log(this.props.auth);
    console.log(this.state.photo);
    const {fullName, phoneNumber} = this.state;
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('image', this.state.photo);
    this.props
      .patchUser(formData, this.props.auth.dataLogin.token)
      .then((val) => {
        console.log(val);
        this.setState({msg: ''});
      })
      .catch((val) => {
        console.log(val.response.data.msg);
        this.setState({
          msg: val.response ? val.response.data.msg : 'Error server',
        });
      });
  };

  render() {
    const {fileUri} = this.state;
    const {token} = this.state;
    const email = this.props.auth.dataLogin.email;
    console.log('initoken', token);
    return (
      <>
        <StatusBar backgroundColor="#583A8E" />
        <View style={style.fill}>
          <View style={style.content}>
            <View style={{...{flex: 1}}}>
              <View style={style.contentProfile}>
                <View style={style.imageWrapper}>
                  {this.props.user.isLoading === false && (
                    <Image
                      resizeMode={'cover'}
                      source={{
                        uri:
                          this.state.photo === null
                            ? fileUri
                            : this.state.photo.uri,
                      }}
                      style={{...{width: 80, height: 80, borderRadius: 40}}}
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={this.handleChoosePhoto}
                  style={style.btnEditImage}>
                  <Text style={style.btnEditText}>
                    Update Your Profile Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.content2}>
                <Text style={style.textContent}>Full Name</Text>
                <TextInput
                  style={style.textInput}
                  onChangeText={(val) => this.setState({fullName: val})}
                  defaultValue={this.state.fullName}
                  placeholder="emoney"
                />
                <Text style={style.textContent}>Phone Number</Text>
                <TextInput
                  style={style.textInput}
                  onChangeText={(val) => this.setState({phoneNumber: val})}
                  defaultValue={this.state.phoneNumber}
                  placeholder="0808080808"
                />
                <Text style={style.textContent}>Email</Text>
                <TextInput style={style.textInput} defaultValue={email} />
              </View>
            </View>
            <TouchableOpacity style={style.button} onPress={this.submit}>
              {this.props.user.isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={style.buttonText}>SAVE</Text>
              )}
            </TouchableOpacity>
            <View style={{...{marginTop: 15}}}>
              <Text style={{...{color: 'red', textAlign: 'center'}}}>
                {this.state.msg}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {logout, patchUser, getUserById};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const style = StyleSheet.create({
  fill: {
    alignSelf: 'stretch',
    flex: 1,
  },
  content: {
    alignSelf: 'stretch',
    margin: 20,
    marginTop: 20,
    flex: 1,
  },
  contentProfile: {
    marginTop: 20,
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEditImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEditText: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    color: '#06B3BA',
  },
  btnEditText2: {
    marginTop: -20,
    marginRight: 20,
    color: '#06B3BA',
  },
  content2: {
    marginTop: 20,
  },
  textContent: {
    color: '#AAAAAA',
    marginTop: 10,
  },
  textInput: {
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
  },
  contentFill1: {
    alignItems: 'flex-end',
  },
  button: {
    alignSelf: 'stretch',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#01B0B7',
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
