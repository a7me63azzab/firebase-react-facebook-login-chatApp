import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";


const initialState={
    isAuth:false,
    loading:false
};

const onAuthStart =(state,action)=>{
    return updateObject(state,{
        loading:true
    });
};


const onAuthSuccess =(state,action)=>{
    return updateObject(state,{
        isAuth:true,
        loading:false
    });
};

const onAuthFail =(state,action)=>{
    return updateObject(state,{
        loading:false
    });
};


const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ON_AUTH_START: return onAuthStart(state,action);
        case actionTypes.ON_AUTH_SUCCESS: return onAuthSuccess(state,action);
        case actionTypes.ON_AUTH_FAIL: return onAuthFail(state,action);
        default: return state;
    }
};

export default reducer;