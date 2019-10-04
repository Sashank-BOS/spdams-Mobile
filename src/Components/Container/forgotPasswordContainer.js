
import React, { Component } from 'react';
import { Alert } from 'react-native';
import Helper from '../../Utilities/helper';
import ForgotPassword from '../Presentational/forgotPassword';
import NetworkService from '../../Network/NetworkService';
import Remote from '../../Config/remote';

export default class ForgotPasswordContainer extends Component {

  constructor(props) {
    super(props);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
  }

  /* 
    Initial state 
  */
  state = {
    email: '',
    errors: {
      emailError: false
    },
    isLoading: false,

  };

  /* 
     Update state properties with onChangeText for every Inputfield.
     Changing the Error status message.
  */
  onChangeTextHandler = (name, errorKey, value) => {
   
    let error = this.state.errors
    error[errorKey] = false;
    this.setState({ [name]: value, errors: error });
  }

  onSubmitBtn = () => {
    
    // stop here if form is invalid
    if (!this.validateFields()) {
      return;
    } 
    this.getUserDetails(this.state.email);
  };
  
  /* 
  Get usedetails and assign to state property 
  */
  getUserDetails = (email) => {

    this.setState({ isLoading: true });

    NetworkService.getUserDetails(email).then(response => {
      if (response.ok || response.status === 200) {
        response.json().then((responsejson) => {
            responsejson.value.length > 0 ? 
            this.forgotPassword(responsejson.value[0]) : 
            this.alertMessage("No records found for your search.");
        })
      } else {
        this.alertMessage("Something went wrong. Please try again later.")
      }
    }).catch(error => {
      this.alertMessage("Something went wrong. Please try again later.")
    })
  }

  forgotPassword = (userDetails) => {

    // Generating new random password
    let newpassword = Helper.generatePassword();

    // Creating details object with new password to pass to remote API
    let details = { newPassword: newpassword }

    // API call to set the new password in remote database
    NetworkService.forgotPassword(userDetails.id, details).then(response => {
      if (response.ok || response.status === 200) {  
        // On success send email to the input email id
        this.sendEmail(userDetails, details.newPassword)
      } else {
        this.alertMessage("Something went wrong. Please try again later.")
      }
    }).catch(error => {
      this.alertMessage("Something went wrong. Please try again later.")
    })
  };

  sendEmail = (userDetails, password) => {

    const message = Helper.emailComposeMessage(userDetails, password);
    
    // API call to send a new password to the input email 
    fetch(Remote.SEND_GRID_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: Remote.SEND_GRID_KEY,
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        if (response.ok || response.status === 200) {
          this.alertMessage("A temporary password has been sent to your email address. Please be sure to change your password after logging in.");
        }
      })
      .catch(error => {
        this.alertMessage("Something went wrong. Please try again later.");
      })

  }

  /*
  Validate user entered Email in input field  
  */
  validateFields() {
    const { email, errors } = this.state;
    errors.emailError = Helper.isEmailValid(email)
    
    this.setState({ errors })
    return Helper.validateForm(errors);
  }

  /*
  Alert user with valid message 
  */
  alertMessage(message) {
    Alert.alert("Alert", message, [
      {
        text: "OK",
        onPress: () => {
          this.setState({ isLoading: false });
        }
      }
    ]);
  }

  render() {
    return (
      <ForgotPassword
        data={this.state}
        onChangeTextHandler={this.onChangeTextHandler}
        onSubmitBtnTapped={this.onSubmitBtn}
        isLoading = {this.state.isLoading}
      />
    );
  }
}

