import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import {getUserData} from "../js/localStorage";

class Logout extends Component{


    componentWillMount(){
         console.log('loginToken:',this.props.loginToken);
         console.log('RegisterToken:',this.props.RegisterToken);
         var userData = getUserData();
         console.log('local storage token',userData.token);
         console.log('local storage id',userData.id);
         console.log('userData',userData);
         this.props.onLogout(userData.token);
         this.props.history.push('/login');
        //  window.location.reload();
    }

    render(){
        return(
            <div>
                user logedout
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        loginToken:state.Register.token,
        RegisterToken:state.Login.token
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:(token)=>dispatch(actionCreators.onLogout(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Logout));