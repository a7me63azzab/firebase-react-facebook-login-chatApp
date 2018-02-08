import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import Styles from "./ChatHeader.module.css";
const {Header} = Layout;

class ChatHeader extends Component{
    render(){
        return(
            <Header className="header">
                <div className={Styles.logo} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/chat">Chat</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item>
                </Menu>
            </Header>
    );
    }
};
export default ChatHeader;