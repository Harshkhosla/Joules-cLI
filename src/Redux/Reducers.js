import { SET_USER_EMAIL, SET_USER_NAME, SET_AUTH_TOKEN, SET_USER_CAR,SET_USER_FLAT,SET_MODE_VALUE,SET_STATE_VALUE,SET_USER_ENERGY,SET_USER_PRODUCTKEY,SET_USER_PRODUCT, SET_USER_POWER, SET_PUBLIC_CHARGER_TIME,SET_USER_CURRENT,SET_CHARGING_COST,SET_CHARGING_COST_PER_HOUR} from './Action';

const initialState = {
    Total_Current: "",
    email: "",
    authtoken:"",
    Battery_Pack:"",
    House:"",
    Car:"",
    modeValue:"",
    StateValue:"",
    SetEnergy:"",
    setProductkey:"",
    setTimePubCharger:"",
    SetPower:"",
    SetCurrent:"",
    setchargingcost:"",
    setchargingcostperhour:"",
    Product:[],
    CurrentPower:[]
}

function userReducers(state = initialState, action) {
  // console.log("action.payload",action.payload)
    switch (action.type) {
      case SET_USER_NAME:
        return { ...state, Total_Current: action.payload };
        case SET_USER_EMAIL:
          return { ...state, email: action.payload };
        case SET_USER_PRODUCTKEY:
          return { ...state, setProductkey: action.payload };
          case SET_USER_CAR:
        // console.log("harshsample",action);
        return { ...state, Battery_Pack: action.payload.Battery_Pack ,Car:action.payload.Car};
          case SET_USER_FLAT:
        // console.log("harshsample",action);
        return { ...state, House: action.payload };
          case SET_MODE_VALUE:
        // console.log("harshsahgmple",action);
        return { ...state, modeValue: action.payload };
          case SET_USER_PRODUCT:
        // console.log("harshsahgmple",action);
        return { ...state, Product: action.payload };
          case SET_STATE_VALUE:
        // console.log("harshsahgmple",action);
        return { ...state, StateValue: action.payload };
          case SET_USER_ENERGY:
        // console.log("harshsahgmple",action);
        return { ...state, SetEnergy: action.payload };
      // power public charger
      case SET_USER_POWER:
        // console.log("harshsahgmple",action);
        return { ...state, SetPower: action.payload ,CurrentPower: [...state.CurrentPower, action.payload]};
      case SET_USER_CURRENT:
          // console.log("harshsahgmple",action);
          return { ...state, SetCurrent: action.payload };
      case SET_AUTH_TOKEN:
        // console.log("harshsample",action);
        return { ...state, authtoken: action.payload };

      case SET_PUBLIC_CHARGER_TIME:
        // console.log("harshsample",action);
        return { ...state, setTimePubCharger: action.payload };
      case SET_CHARGING_COST:
          // console.log("harshsample",action);
        return { ...state, setchargingcost: action.payload };
      case SET_CHARGING_COST_PER_HOUR:
          // console.log("harshsample",action);
        return { ...state, setchargingcostperhour: action.payload };
      default:
        return state;
    }
  }
  

export default userReducers;