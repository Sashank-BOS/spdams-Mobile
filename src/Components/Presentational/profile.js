/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';
import CommonStyles from '../../Styles/commonStyles';
import Input from '../Common/input';
import UserAvatar from 'react-native-user-avatar';
import Loader from "rn-progress-loader";
import Button from '../../Components/Common/button';
import DatePicker from "react-native-datepicker";
import Constants from '../../Utilities/constants';
import Picker from "react-native-picker-select";

const genderPlaceholder = {
    label: "Select a gender",
    value: "",
    color: "gray"
};

const genderPickerData = [
    {
        key: 0,
        label: "Male",
        value: "Male"
    },
    {
        key: 1,
        label: "Female",
        value: "Female"
    }
];

export default class Profile extends Component {

    render() {

        const { isLoading, data, onChangeTextHandler, onSaveBtnTapped } = this.props;

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Loader
                    visible={isLoading}
                    isModal={true}
                    isHUD={true}
                    hudColor={"#000"}
                    color={"#fff"}
                />
                {/* You can replace to add & update profile image and resize your container */}
                <View style={{ alignItems: "center", justifyContent: "flex-start", flex: 0.2, marginTop: 20 }}>
                    <UserAvatar name={`${data.firstName} ${data.lastName}`} size={100} color="#424142" />
                </View>
                
                {/* You can replace to add & update profile image and resize your container */}
                <KeyboardAvoidingView
                    style={styles.formContainer}
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    enabled
                    keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}>

                    <ScrollView>
                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            inputType="UNDER_LINE"
                            labelName="First Name"
                            secureTextEntry={false}
                            capitalize="sentences"
                            keyboardType="default"
                            placeholder="First Name"
                            returnKeyType="next"
                            value={data.firstName}
                            changeText={(value) => onChangeTextHandler("firstName", value)} />

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            inputType="UNDER_LINE"
                            labelName="Last Name"
                            secureTextEntry={false}
                            capitalize="sentences"
                            keyboardType="default"
                            placeholder="Last Name"
                            returnKeyType="next"
                            value={data.lastName}
                            changeText={(value) => onChangeTextHandler("lastName", value)} />

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            inputType="UNDER_LINE"
                            labelName="Email address"
                            secureTextEntry={false}
                            capitalize="none"
                            editable={false}
                            keyboardType="email-address"
                            placeholder="Email Address"
                            returnKeyType="done"
                            value={data.email}
                            changeText={(value) => onChangeTextHandler("email", value)} />

                        <Input
                            containerStyle={CommonStyles.inputBorder}
                            inputType="UNDER_LINE"
                            labelName="Phone number"
                            secureTextEntry={false}
                            keyboardType="phone-pad"
                            placeholder="Phone Number"
                            returnKeyType="done"
                            value={data.phoneNumber}
                            changeText={(value) => onChangeTextHandler("phoneNumber", value)} />

                        <Text style={{ marginTop: 10 }}>Data of birth</Text>
                        <DatePicker
                            style={styles.dOBDatePicker}
                            showIcon={false}
                            mode="date"
                            date={data.dateOfBirth} 
                            placeholder="Select a date"
                            format="MM/DD/YYYY" 
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateText: {
                                    color: Constants.TEXT_INPUT_COLOR,
                                    fontSize: 16
                                },
                                placeholderText: {
                                    color: "#545454",
                                    fontSize: 16
                                },
                                dateInput: {
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    height: 44,
                                    alignItems: "flex-start",
                                }
                            }}
                            onDateChange={date => {
                                onChangeTextHandler("dateOfBirth", date)
                            }}
                        />

                        <Text style={{ marginTop: 10 }}>Gender</Text>
                        <Picker
                            placeholder={genderPlaceholder}
                            items={genderPickerData}
                            value={data.gender}
                            onValueChange={value => {
                                onChangeTextHandler("gender", value)
                            }}
                            useNativeAndroidPickerStyle={false}
                            style={{
                                ...pickerStyle,
                                placeholder: {
                                    color: "#545454",
                                    fontSize: 16,
                                }
                            }}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>

                <View style={styles.saveBtnContainer}>
                    <Button
                        onPress={onSaveBtnTapped}
                        buttonText="SAVE" />
                </View>

            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    formContainer: {
        flex: 0.7,
        marginTop: 15,
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
    },
    dOBDatePicker: {
        width: "100%",
        alignItems: "flex-start",
        height: 44
    }
});

const pickerStyle = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        height: 44,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: Constants.TEXT_INPUT_COLOR,
        borderColor: Constants.BORDER_COLOR,
    },
    inputIOS: {
        fontSize: 16,
        height: 44,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: Constants.BORDER_COLOR,
        color: Constants.TEXT_INPUT_COLOR,
    }
});



