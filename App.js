/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { View, AsyncStorage, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import { getRootNavigator } from './src/Navigator/AppNavigator';
import Constants from './src/Utilities/constants';

import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./src/reducers";
import { Provider } from "react-redux";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: null  // initial set isLoggedIn status with null.
    };
    this._bootstrap();
  }
  
  /* 
    To check if user already logged In. 
    If userId exists in App local storage (AsyncStorage) update to component state with status.
  */
  _bootstrap = async () => {
    try {
      AsyncStorage.getItem(Constants.USERID).then((userDetails) => {
        this.setState({
          isLoggedIn: userDetails != null
        })
      });
    } catch (error) {
      this.setState({ isLoggedIn: false })
    }
  }

  render() {

    /* Create redux store to save the App data */
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    if (this.state.isLoggedIn != null) {

      // Get a root navigation based on the stauts of isLoggedIn property in state
      // If it is isLoggedIn = true -> Navigated to App(Home)
      // If it is isLoggedIn = false -> Navigated to Auth(Login)
      const rootNavigator = getRootNavigator(this.state.isLoggedIn);
      const AppContainer = createAppContainer(rootNavigator);
      return (<Provider store={store}>
        <AppContainer />
      </Provider>);
    } else {
      {/* Render a loader/sipnner component with initial render  */}
      return (<View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});