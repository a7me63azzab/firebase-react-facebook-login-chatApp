import React, { Component } from 'react';
import { Layout } from 'antd';
import Chat from "../src/containers/Chat";
import {Route} from "react-router-dom";
import Login from "../src/containers/Login/Login";
import Home from "../src/components/Home";
import ChatHeader from "../src/components/ChatHeader/ChatHeader";


const {  Content, Footer } = Layout;


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <ChatHeader>Header</ChatHeader>
           <Content style={{ padding: '50px 50px 20px 50px' }}>
           <Route exact path='/' component={Home}/>
           <Route  path='/login' component={Login}/>
           <Route  path='/chat' component={Chat}/>
           </Content>
           <Footer style={{ textAlign: 'center' }}>
                 Chat App ©2018 Created by ahme6.azza8
           </Footer>
        </Layout>
        
      </div>
    );
  }
}

export default App;