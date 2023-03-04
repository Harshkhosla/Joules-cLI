import {SET_USER_EMAIL,SET_USER_NAME} from './Action';


const initialState={
    name:"",
    email:""
}

function userReducers(state=initialState,action){
    switch(action.type){
        case SET_USER_NAME:
            return {...state,name:action.payload}
        case SET_USER_EMAIL:
            return {...state,email:action.payload}
        default:
            return state;    
    }
}

export default userReducers;