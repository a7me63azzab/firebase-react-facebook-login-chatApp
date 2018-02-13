import * as actionTyps from "./actionTypes";
import axios from "../../axios_base";
import userModel from "../../js/models/user";
import firebaseApp from "../../js/firebase";
import {saveUserData} from "../../js/localStorage";

const onLoginStart=()=>{
    return{
        type:actionTyps.ON_LOGIN_START
    };
};
const onLoginSuccess=(id,userName,email,token)=>{
    return{
        type:actionTyps.ON_LOGIN_SUCCESS,
        userId:id,
        userName:userName,
        userMail:email,
        authToken:token
    };
};
const onLoginFail=()=>{
    return{
        type:actionTyps.ON_LOGIN_FAIL
    };
};

const onGetDataFromLogin=()=>{
    return{
        type:actionTyps.ON_GET_DATA
    };
}



export const onLogin=(userCredentials)=>{
    return dispatch=>{
        console.log('loading....');
        dispatch(onLoginStart());
        axios.post('/login',userCredentials).then(res=>{
            console.log(res.data);
            console.log('status :',res.status); 
            // var token = res.headers['x-auth']; ///fetch x-auth from the header .
            var id = res.data._id;
            var email = res.data.email;
            var userName = res.data.username;
            var token = res.data.tokens[0].token;
            var userData={
                id:id,
                token:token
            }
            saveUserData(userData);
            let database = firebaseApp.database();
            let user = userModel(id,userName,email,token,[]);
            database.ref('/users/'+id).set(user).then(()=>{
                console.log('user added to firebase successfully');
                dispatch(onGetDataFromLogin());
            }).catch((err)=>{
                console.log('failed to add user to firebase',err);
            });
 
            dispatch(onLoginSuccess(id,userName,email,token));
        }).catch(err=>{
            dispatch(onLoginFail());
        });
    };

};