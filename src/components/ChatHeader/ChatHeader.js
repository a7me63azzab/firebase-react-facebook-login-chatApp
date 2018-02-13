import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import Styles from "./ChatHeader.module.css";
// import {getUserData} from "../../js/localStorage";
import {connect} from "react-redux";
const {Header} = Layout;

class ChatHeader extends Component{

    render(){
    //   var userData = getUserData();
    //   console.log(userData.token);
      console.log(this.props.loginAuth);
      console.log(this.props.registerAuth);

 
        return(
            <Header className="header">
                <div className={Styles.logo} />
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/chat">Chat</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/register" >Regitser</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/login" >Login</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/logout" >logout</Link></Menu.Item>

                </Menu>
            </Header>
    );
    }
};

const mapStateToProps=state=>{
    return{
        loginAuth:state.Login.authorized,
        registerAuth:state.Register.authorized,
        logoutAuth:state.Logout.authorized
    }
}


export default connect(mapStateToProps)(ChatHeader);