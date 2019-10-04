/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';
import Input from '../Common/input';
import Helper from '../../Utilities/helper';
import LogoImage from '../Common/logoImage';
import Constants from '../../Utilities/constants';
import CommonStyles from '../../Styles/commonStyles';
import Button from '../Common/button';
import Loader from "rn-progress-loader";

export default class Login extends Component {

    render() {

        const { isLoading, data, onChangeTextHandler, onPressSubmit } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>

                    {/* Loader control */}
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

                    <KeyboardAvoidingView
                        style={styles.formContainer}
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        enabled
                        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>

                        <ScrollView>

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.firstNameError ?
                                        { borderColor: 'red' }
                                        : { borderColor: Constants.BORDER_COLOR }
                                ]}
                                secureTextEntry={false}
                                capitalize="sentences"
                                keyboardType="default"
                                placeholder="First Name"
                                returnKeyType="next"
                                value={data.firstName}
                                changeText={(value) => onChangeTextHandler("firstName", "firstNameError", null, value)} />
                            {Helper.errorMessage(data.errors.firstNameError, "First name is required.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.lastNameError ?
                                        { borderColor: 'red' }
                                        : { borderColor: Constants.BORDER_COLOR }
                                ]}
                                secureTextEntry={false}
                                capitalize="sentences"
                                keyboardType="default"
                                placeholder="Last Name"
                                returnKeyType="next"
                                value={data.lastName}
                                changeText={(value) => onChangeTextHandler("lastName", "lastNameError", null, value)} />
                            {Helper.errorMessage(data.errors.lastNameError, "Last name is required.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.emailError ?
                                        { borderColor: 'red' }
                                        : { borderColor: Constants.BORDER_COLOR }
                                ]}
                                secureTextEntry={false}
                                capitalize="none"
                                keyboardType="email-address"
                                placeholder="Email"
                                returnKeyType="next"
                                value={data.email}
                                changeText={(value) => onChangeTextHandler("email", "emailError", null, value)} />
                            {Helper.errorMessage(data.errors.emailError, "Email is not valid.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.confirmEmailError || data.errors.emailNotMatched ?
                                        { borderColor: 'red' }
                                        : { borderColor: Constants.BORDER_COLOR }
                                ]}
                                secureTextEntry={false}
                                capitalize="none"
                                keyboardType="email-address"
                                placeholder="Re-enter your email"
                                returnKeyType="next"
                                value={data.confirmEmail}
                                changeText={(value) => onChangeTextHandler("confirmEmail", "confirmEmailError", "emailNotMatched", value)} />
                            {data.errors.confirmEmailError ?
                                Helper.errorMessage(data.errors.confirmEmailError, "Email is not valid.") :
                                Helper.errorMessage(data.errors.emailNotMatched, "Emails do not match.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.passwordError ?
                                        { borderColor: 'red' }
                                        : { borderColor: Constants.BORDER_COLOR }
                                ]}
                                secureTextEntry={true}
                                keyboardType="default"
                                placeholder="Password"
                                returnKeyType="next"
                                value={data.password}
                                changeText={(value) => onChangeTextHandler("password", "passwordError", null, value)} />
                            {Helper.errorMessage(data.errors.passwordError, "Password must have at least 6 characters.")}

                            <Input
                                containerStyle={[
                                    CommonStyles.inputBorder,
                                    data.errors.confirmPasswordError || data.errors.passwordNotMatched ?
                                        { borderColor: 'red' }
                                        : { borderColor: Constants.BORDER_COLOR }
                                ]}
                                secureTextEntry={true}
                                keyboardType="default"
                                placeholder="Re-enter your password"
                                returnKeyType="done"
                                value={data.confirmPassword}
                                changeText={(value) => onChangeTextHandler("confirmPassword", "confirmPasswordError", "passwordNotMatched", value)} />

                            {data.errors.confirmPasswordError ?
                                Helper.errorMessage(data.errors.confirmPasswordError, "Password must have at least 6 characters.") :
                                Helper.errorMessage(data.errors.passwordNotMatched, "Passwords do not match.")}


                        </ScrollView>
                    </KeyboardAvoidingView>
                    <View style={styles.saveBtnContainer}>
                        <Button
                            onPress={onPressSubmit}
                            buttonText="SUBMIT" />
                    </View>
                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        flex: 0.7,
        marginLeft: 35,
        marginRight: 35,
        justifyContent: 'flex-start',
    },
    saveBtnContainer: {
        flex: 0.1,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 10,
        justifyContent: 'flex-start'
    }
});
