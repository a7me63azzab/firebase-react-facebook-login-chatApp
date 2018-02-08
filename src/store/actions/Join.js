import * as actionTypes from "./actionTypes";
import firebaseApp from "../../js/firebase";
import userModel from "../../js/models/user";

export const onJoinStart = ()=>{
    return {
        type: actionTypes.ON_JOIN_START
    }
};

export const onJoinFail = ()=>{
    return {
        type : actionTypes.ON_JOIN_FAIL
    }
};

export const onJoinSuccess = (key,userName,email,token)=>{
    return {
        type : actionTypes.ON_JOIN_SUCCESS,
        userId:key,
        ownerName:userName,
        email:email,
        authToken:token
    }
};

export const onJoin =(authUser)=>{
    return dispatch=>{
        dispatch(onJoinStart());
        let database = firebaseApp.database();
        let key = database.ref('/users/').push().key;
        let userName = authUser.name;
        let email = authUser.email;
        let token = authUser.token; 
        let user = userModel(key,userName,email,token,[]);
        database.ref('/users/'+ key).set(user).then(()=>{
            dispatch(onJoinSuccess(key,userName,email,token));
            console.log('success');
        }).catch((err)=>{
            dispatch(onJoinFail());
            console.log(err);
        });
    }
};