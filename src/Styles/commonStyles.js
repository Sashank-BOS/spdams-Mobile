import { StyleSheet } from "react-native";
import Constants from '../Utilities/constants';

const commonStyles = StyleSheet.create({

  // TextInput container style
  textInputContainer: {
    marginTop: 16,
    height: Constants.TEXT_INPUT_HEIGHT,
    borderRadius: Constants.CORNER_RADIUS,
  },
  // TextInput style
  textInputStyle: {
    paddingTop: 2,
    paddingBottom: 0,
    fontSize: Constants.FONT_SIZE_N,
    color: Constants.TEXT_INPUT_COLOR,
    height: Constants.TEXT_INPUT_HEIGHT,
    borderRadius: Constants.CORNER_RADIUS,
    paddingLeft: Constants.TEXT_FIELD_PADDING,
    backgroundColor: Constants.TEXT_INPUT_BG_COLOR,
  },
  // TextInput border style
  inputBorder: {
    borderWidth: 1,
    marginTop: 15,
    borderColor: Constants.BORDER_COLOR,
    borderRadius: Constants.CORNER_RADIUS,
  },
  // Error style
  error: {
    marginLeft: Constants.TEXT_FIELD_PADDING,
    fontSize: Constants.FONT_SIZE_S,
    marginTop: 5,
    color: "red",
  }, 
  // Button style 
  btnStyle: {
    borderRadius: 2,
    height: 44,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: Constants.BUTTON_TEXT_COLOR,
    backgroundColor: Constants.BUTTON_COLOR,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  menuBtn: {
    marginRight: 16,
    height: 44,
    width: 44,
    alignItems:"flex-end",
    justifyContent:"center"
  }
});

export default commonStyles;
