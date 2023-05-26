import { SET_USER_EMAIL, SET_USER_NAME, SET_AUTH_TOKEN, SET_USER_CAR,SET_USER_FLAT } from './Action';


const initialState = {
    Total_Current: "",
    email: "",
    authtoken:"",
    Battery_Pack:"",
    House:"",
    Car:""
}

function userReducers(state = initialState, action) {
    switch (action.type) {
      case SET_USER_NAME:
        return { ...state, Total_Current: action.payload };
        case SET_USER_EMAIL:
          return { ...state, email: action.payload };
          case SET_USER_CAR:
        console.log("harshsample",action);
        return { ...state, Battery_Pack: action.payload.Battery_Pack ,Car:action.payload.Car};
          case SET_USER_FLAT:
        console.log("harshsample",action);
        return { ...state, House: action.payload };
      case SET_AUTH_TOKEN:
        // console.log("harshsample",action);
        return { ...state, authtoken: action.payload };
      default:
        return state;
    }
  }
  

export default userReducers;