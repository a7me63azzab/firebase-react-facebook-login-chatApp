import * as actionTypes from "./actionTypes";
import axios from "../../axios_base";
import firebaseApp from "../../js/firebase";
import userModel from "../../js/models/user";
import {saveUserData} from "../../js/localStorage";

const onRegisterStart =()=>{
    return{
        type:actionTypes.ON_REGISTER_START
    }
};

const onRegisterSuccess=(id,userName,email,token)=>{
    return{
        type:actionTypes.ON_REGISTER_SUCCESS,
        userId:id,
        userName:userName,
        userMail:email,
        authToken:token
    };
};

const onGetData=()=>{
    return{
        type:actionTypes.ON_GET_DATA
    }
}

const onRegisterFail=()=>{
    return{
        type:actionTypes.ON_REGISTER_FAIL
    };
};

export const onRegister=(userData)=>{
    console.log('onRegisterStart');
    return dispatch =>{
        dispatch(onRegisterStart());
        axios.post('/register' , userData).then(res=>{       
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
                dispatch(onGetData());
            }).catch((err)=>{
                console.log('failed to add user to firebase',err);
            });
            dispatch(onRegisterSuccess(id,userName,email,token));
            
       }).catch(err=>{
        dispatch(onRegisterFail(err));
        console.log(err);
       });
    }
};