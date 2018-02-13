import React, {Component} from "react";
import { Form,Spin, Icon, Input, Button, Checkbox } from 'antd';
import ForgetPassword from "../ForgetPassword/ForgerPassword";
import {connect} from "react-redux";
import {withRouter,Link} from "react-router-dom";
import Styles from "./Login.module.css";
import * as actionCreators from "../../store/actions/index";
// import {getUserToken} from "../../js/localStorage";
const FormItem = Form.Item;

class Login extends Component {
  state={
    visible:false
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.loginChat === true){
        this.props.history.push('/chat');
    }
}

  
  showModal = () => {
    console.log('clicked');
    this.setState({ visible: true });
    console.log(this.state.visible);
  }

  loginClickedHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        delete values['remember'];
        this.props.onLogin(values);
        // this.props.history.push('/chat');
       
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
         <Spin spinning={this.props.loading}>
        <Form onSubmit={this.loginClickedHandler} className={Styles.loginForm}>
        <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                        required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
                    )}
                </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <span className={Styles.loginFormForgot} onClick={this.showModal}>Forgot password</span>
          <Button type="primary" htmlType="submit" className={Styles.loginFormButton} loading={this.props.loading}>
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </FormItem>
      </Form>
      </Spin>
      <ForgetPassword visible={this.state.visible}/>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  console.log(state);
  return{
      loading:state.Login.loading,
      loginChat:state.Login.goToChatFromLogIn,
  }
};
const mapDispatchToProps = dispatch =>{
  return{
      onLogin:(userCredentials) => dispatch(actionCreators.onLogin(userCredentials))
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Form.create()(Login)));