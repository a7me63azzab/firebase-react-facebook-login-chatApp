import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    ownerId:null,
    ownerName:null,
    token:null,
    email:null,
    authorized:false,
    loading:false,
    goToChat:false,
    authRedirect:null
};

const onRegisterStart =(state,action)=>{
    return updateObject(state,{
        loading:true
    });
};

const onGetData=(state,action)=>{
    return updateObject(state,{
        goToChat:true
    })
}


const onRegisterSuccess =(state,action)=>{
    return updateObject(state,{
        ownerId:action.userId,
        ownerName:action.userName,
        email:action.userMail,
        token:action.authToken,
        authorized:true,
        authRedirect:'/chat',
        loading:false
    });
};

const onRegisterFail =(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_REGISTER_START: return onRegisterStart(state,action);
        case actionTypes.ON_REGISTER_SUCCESS: return onRegisterSuccess(state,action);
        case actionTypes.ON_REGISTER_FAIL: return onRegisterFail(state,action);
        case actionTypes.ON_GET_DATA:return onGetData(state,action);
        default: return state;
    }
};

export default reducer;