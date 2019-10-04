/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import LogoImage from '../Common/logoImage';
import Input from '../Common/input';
import Button from '../Common/button';
import Constants from '../../Utilities/constants';
import Helper from '../../Utilities/helper';
import Loader from "rn-progress-loader";


export default class Login extends Component {

  render() {

    const { isLoading, data, onPressLogin, onPressForgot, onPressRegister, onChangeTextHandler, inputs, focusNextField } = this.props;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Constants.APP_THEME_COLOR }}>

        <View style={styles.container}>
          <Loader
            visible={isLoading}
            isModal={true}
            isHUD={true}
            hudColor={"#000"}
            color={"#fff"}
          />

          {/* You can replace your logo and resize your logo container */}
          <View style={styles.logoContainer}>
            <LogoImage imagePath={require('../../Assets/Images/logo.png')} />
          </View>

          {/* Form input fields */}
          <View style={styles.formContainer}>
            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.emailError
                ? { borderColor: 'red' }
                : { borderColor: Constants.BORDER_COLOR }]}
              secureTextEntry={false}
              capitalize="none"
              keyboardType="email-address"
              placeholder="Email address"
              returnKeyType="next"
              value={data.email}
              changeText={(value) => onChangeTextHandler("email", "emailError", value)} />

            {Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

            <Input
              containerStyle={[CommonStyles.inputBorder,
              data.errors.passwordError
                ? { borderColor: 'red' }
                : { borderColor: Constants.BORDER_COLOR }]}
              secureTextEntry={true}
              capitalize="sentences"
              keyboardType="default"
              placeholder="Password"
              returnKeyType="done"
              value={data.password}
              changeText={(value) => onChangeTextHandler("password", "passwordError", value)} />

            {Helper.errorMessage(data.errors.passwordError, "Password must have at least 6 characters.")}

            {/* Login buttton */}
            <Button
              onPress={onPressLogin}
              marginTop={35}
              buttonText="LOGIN" />

            {/*Forgot password underline button */}
            <TouchableOpacity
              onPress={onPressForgot}
              style={styles.forgotPassword}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Forgot Password</Text>
            </TouchableOpacity>

            {/*Register underline button */}
            <TouchableOpacity
              onPress={onPressRegister}
              style={styles.registerBtnStyle}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 35,
    marginRight: 35,
  },
  logoContainer: {
    flex: 0.2,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: '#545454',
    fontSize: 17
  },
  forgotPassword: {
    marginTop: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnStyle: {
    marginTop: 10,
    height: 44,
    alignItems: 'center',
    color: Constants.TEXT_COLOR,
    justifyContent: 'flex-start',
  }
});
