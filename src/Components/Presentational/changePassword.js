/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Input from '../Common/input';
import Helper from '../../Utilities/helper';
import Button from '../../Components/Common/button';
import CommonStyles from '../../Styles/commonStyles';

export default class ChangePassword extends Component {

    render() {

        const { data, onChangeTextHandler, onSaveBtnTapped } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>

                <ScrollView>

                    <View style={styles.formContainer}>
                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            keyboardType="default"
                            placeholder="Current password"
                            returnKeyType="next"
                            value={data.currentPassword}
                            changeText={(value) => onChangeTextHandler("currentPassword", "currentPasswordError", "null", value)} />
                        {Helper.errorMessage(data.errors.currentPasswordError, "Current password cannot be empty.")}

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            keyboardType="default"
                            placeholder="New password"
                            returnKeyType="next"
                            value={data.newPassword}
                            changeText={(value) => onChangeTextHandler("newPassword", "newPasswordError", null, value)} />
                        {Helper.errorMessage(data.errors.newPasswordError, "Password must have at least 6 characters.")}

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            secureTextEntry={true}
                            keyboardType="default"
                            placeholder="Confirm new password"
                            returnKeyType="done"
                            value={data.confirmNewPasword}
                            changeText={(value) => onChangeTextHandler("confirmNewPasword", "confirmNewPaswordError", "passwordNotMatches", value)} />
                        {data.errors.confirmNewPaswordError ?
                            Helper.errorMessage(data.errors.confirmNewPaswordError, "Password must have at least 6 characters.") :
                            Helper.errorMessage(data.errors.passwordNotMatches, "Passwords do not match.")}


                        <Button
                            onPress={onSaveBtnTapped}
                            buttonText="SAVE" />
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    formContainer: {
        marginTop: 50,
        marginLeft: 35,
        marginRight: 35,
        justifyContent: 'flex-start',
    }
});


