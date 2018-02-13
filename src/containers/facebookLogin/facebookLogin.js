import React, {Component} from "react";
import Styles from "./Login.module.css";
import {connect} from "react-redux"; 
import firebaseApp from "../../js/firebase";
import * as actionCreators from "../../store/actions/index";
import * as firebase from 'firebase';
import {withRouter} from "react-router-dom";

const longinStyle=[Styles.loginBtn,Styles.loginBtnfacebook];

class Login extends Component{

    state={
        user:{}
    };

    loginClickedHandler=()=>{
        var provider = new firebase.auth.FacebookAuthProvider();
        firebaseApp.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            let authToken = result.credential.accessToken;
            console.log(authToken);

            let authUser = {
                name:result.user.displayName,
                email:result.user.email,
                token:authToken
            };

            this.props.onJoin(authUser);

            this.setState({
                user:authUser
            });
            console.log(result.user.displayName);
            console.log(result.user.email);
            // ...
            this.props.history.push('/chat');
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(credential);
            // ...
          });
        console.log(firebaseApp.name);
        console.log(firebaseApp.database());
    }
    
    render(){
        console.log('state',this.state.user);
        return(
            <center>
                <button className={longinStyle.join(' ')} onClick={this.loginClickedHandler}>
                    Login with Facebook
                </button>
            </center>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.Join.loading
    }
};
const mapDispatchToProps = dispatch =>{
    return{
        onJoin:(userName) => dispatch(actionCreators.onJoin(userName))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));