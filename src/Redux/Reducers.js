import { SET_USER_EMAIL, SET_USER_NAME, SET_AUTH_TOKEN } from './Action';


const initialState = {
    house_voltage: "",
    email: "",
    authtoken:"",
}

function userReducers(state = initialState, action) {
    switch (action.type) {
      case SET_USER_NAME:
        return { ...state, house_voltage: action.payload };
      case SET_USER_EMAIL:
        return { ...state, email: action.payload };
      case SET_AUTH_TOKEN:
        // console.log("harshsample",action);
        return { ...state, authtoken: action.payload };
      default:
        return state;
    }
  }
  

export default userReducers;