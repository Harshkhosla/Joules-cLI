import { SET_USER_EMAIL, SET_USER_NAME } from './Action';


const initialState = {
    house_voltage: "",
    email: ""
}

function userReducers(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, house_voltage: action.payload }
        case SET_USER_EMAIL:
            return { ...state, email: action.payload }
        default:
            return state;
    }
}

export default userReducers;