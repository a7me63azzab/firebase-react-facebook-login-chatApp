import * as actionTyps from "./actionTypes";
import axios from "../../axios_base";

const onAuthStart=()=>{
    return{
        type:actionTyps.ON_AUTH_START
    };
};
const onAuthSuccess=()=>{
    return{
        type:actionTyps.ON_AUTH_SUCCESS
    };
};
const onAuthFail=()=>{
    return{
        type:actionTyps.ON_AUTH_FAIL
    };
};

export const onAuth=(userId,token)=>{
    return dispatch=>{
        console.log('Authenticate....');
        dispatch(onAuthStart());
        axios.get(`/user/${userId}`,{ headers: { 'X-auth':token } }).then(res=>{
            console.log(res.data);
            dispatch(onAuthSuccess());
        }).catch(err=>{
            console.log('err',err);
            dispatch(onAuthFail());
        });
    };

};