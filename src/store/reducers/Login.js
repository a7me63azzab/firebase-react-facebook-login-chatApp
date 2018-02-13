import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    ownerId:null,
    ownerName:null,
    token:null,
    email:null,
    authorized:false,
    goToChatFromLogIn:false,
    loading:false
};

const onLoginStart =(state,action)=>{
    return updateObject(state,{
        loading:true
    });
};

const onGetDataFromLogin=(state,action)=>{
    return updateObject(state,{
        goToChatFromLogIn:true
    });
}




const onLoginSuccess =(state,action)=>{
    return updateObject(state,{
        ownerId:action.userId,
        ownerName:action.userName,
        email:action.userMail,
        token:action.authToken,
        authorized:true,
        loading:false
    });
};

const onLoginFail =(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};



const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_LOGIN_START: return onLoginStart(state,action);
        case actionTypes.ON_LOGIN_SUCCESS: return onLoginSuccess(state,action);
        case actionTypes.ON_LOGIN_FAIL: return onLoginFail(state,action);
        case actionTypes.ON_GET_DATA: return onGetDataFromLogin(state,action);
        default: return state;
    }
};

export default reducer;