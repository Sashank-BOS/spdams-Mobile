import RequestService from './RequestService';
import Remote from '../Config/remote';


class NetworkService {
  
  signUp(params) {
    var url = Remote.SIGNUP;
    return RequestService.postRequest(url, params);
  }
  
  login(params) {
    var url = Remote.SIGNIN;
    return RequestService.postRequest(url, params);
  }

  getUserDetails(email) {
    var url = `${Remote.GET_USER_ID}${"'"}${email}${"'"}`;
    return RequestService.getRequest(url);
  }

  getUserProfileDetails(userId) {
    var url = `${Remote.GET_USER_DATA}${"("}${userId}${")"}?api-version=1.0`;
    return RequestService.getRequest(url, userId);
  }

  forgotPassword(userId, params) {
    var url = `${Remote.FORGOT_PASSWORD}${"("}${userId}${")"}/ForcePasswordChange?api-version=1.0`;
    return RequestService.postRequest(url, params);
  }

  updateUserProfile(userId, params) {
    var url = `${Remote.UPDATE_USER_DATA}${"("}${userId}${")"}?api-version=1.0`;
    return RequestService.patchRequest(url, params);
  }

  changePassword(userId, params) {
    var url = `${Remote.UPDATE_USER_DATA}${"("}${userId}${")"}/ChangePassword?api-version=1.0`;
    return RequestService.postRequest(url, params);
  }
  
}

export default new NetworkService();
