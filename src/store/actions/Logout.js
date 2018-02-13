import * as actionTypes from "./actionTypes";
import axios from "../../axios_base";
import { saveUserData } from "../../js/localStorage";

const onLogoutStart=()=>{
    return{
        type:actionTypes.ON_LOGOUT_START
    }
};
const onLogoutFail=()=>{
    return{
        type:actionTypes.ON_LOGOUT_FAIL
    }
};
const onLogoutSuccess=()=>{
    return{
        type:actionTypes.ON_LOGOUT_SUCCESS
    }
};

export const onLogout=(authToken)=>{
    console.log('blender :',authToken);
    return dispatch=>{
        //delete token from db
        dispatch(onLogoutStart());
        axios.delete('/logout',{ headers: { 'X-auth':authToken } }).then(res=>{
            console.log('user logout successfully');
            var userData = {
                id:"",
                token:""
            };
            saveUserData(userData);
            dispatch(onLogoutSuccess());
        }).catch(err=>{
            console.log('userlogout failed');
            dispatch(onLogoutFail());
        });
        //dispatch an action to remove token from global store
    }
};