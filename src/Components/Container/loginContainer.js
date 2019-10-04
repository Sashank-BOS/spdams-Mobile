/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Constants from '../../Utilities/constants';
import Helper from '../../Utilities/helper';
import Login from '../Presentational/login';
import { connect } from "react-redux";
import { saveUserId } from "../../actions";
import NetworkService from '../../Network/NetworkService';


class LoginContainer extends Component {

  // Initial state
  state = {
    email: '',
    password: '',
    errors: {
      emailError: false,
      passwordError: false,
    },
    isLoading: false,
  };

  constructor(props) {

    super(props);

    // Binding all the button and input fields 
    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressForgot = this.onPressForgot.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }



  // Login api call 
  onPressLogin = () => {

    // stop here if form is invalid
    if (!this.validateFields()) {
      return;
    }

    let params = {
      username: this.state.email.trim(),
      password: this.state.password,
    };

    this.setState({ isLoading: true });

    NetworkService.login(params).then(response => {
      if (response.ok || response.status === 200) {
        this.setState({ isLoading: false });
        response.json().then((responsejson) => {
          this.storeData(responsejson.userId)
        })
      } else if (response.status === 400 || response.status === 404) {
        this.alertMessage("Username or password is incorrect.");
      } else {
        this.alertMessage("Something went wrong. Please try again later.");
      }
    }).catch(error => {
      this.alertMessage("Something went wrong. Please try again later.");
    })

  };

  // Forgot password button action
  onPressForgot = () => {
    this.resetValues();
    this.props.navigation.navigate('ForgotPassword');
  };

  // Create Account button action
  onPressRegister = () => {
    this.resetValues();
    this.props.navigation.navigate('SignUp');
  };

  resetValues() {

    let errors = this.state.errors;

    Object.keys(errors).map(key => {
      errors[key] = false;
    });

    this.setState({ email: '', password: '', errors });
  }

  // Store user info into App local storage 
  async storeData(userId) {
    try {
      return await AsyncStorage.setItem(Constants.USERID, userId, () => {
        this.props.saveUserId(userId);
        this.props.navigation.navigate('Home');
      });
    } catch (error) {
      alert('Something went wrong. Please try again!');
    }
  };

  // Input fields validations 
  validateFields() {

    const { email, password, errors } = this.state;

    errors.emailError = Helper.isEmailValid(email);
    errors.passwordError = password.trim().length > 0 ? false : true;

    this.setState({ errors })

    return Helper.validateForm(errors);
  }

  /* 
     Update state properties with onChangeText for every Inputfield.
     Changing the Error status message.
  */
  onChangeTextHandler = (name, errorKey, value) => {

    let error = this.state.errors
    error[errorKey] = false;
    this.setState({ [name]: value, errors: error });
  }


  alertMessage(message) {
    Alert.alert("Alert", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false })
        }
      }
    ]);
  }

  render() {
    return (
      <Login
        data={this.state}
        inputs={this.inputs}
        onPressLogin={this.onPressLogin}
        onPressForgot={this.onPressForgot}
        onPressRegister={this.onPressRegister}
        onChangeTextHandler={this.onChangeTextHandler}
        focusNextField={this.focusNextField}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default connect(null, { saveUserId })(LoginContainer);

