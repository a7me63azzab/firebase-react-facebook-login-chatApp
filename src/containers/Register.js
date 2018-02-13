import React, {Component} from "react";
import {Form,Spin, Input,Icon,Tooltip, Button} from "antd";
import {connect} from "react-redux";
import * as actionCreators from "../store/actions/index";
import {withRouter, Link} from "react-router-dom";
const FormItem = Form.Item;



class Register extends Component{

    

    state = {
        confirmDirty: false,
      };
        componentWillReceiveProps(nextProps){
            if(nextProps.toChat === true){
                this.props.history.push('/chat');
            }
        }


    submitClickedHandler=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let first = values.firstName;
            let last = values.lastName;
            delete values['firstName'];
            delete values['lastName'];
            delete values['confirm'];
            values['name']={
                first:first,
                last:last
            }
            console.log('values ==++>',values);
            this.props.onRegister(values);

            
            
          }
        });
    };


      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }

      checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }

      onPageReloaded=()=>{
          console.log('page reloaded');
      }

    render(){
        window.onload = this.onPageReloaded;

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };

          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };

        return(
            <Spin spinning={this.props.loading}>
 
            <Form onSubmit={this.submitClickedHandler} >
                <FormItem
                    {...formItemLayout}
                    label='First Name'
                    >
                    {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please input your first name!' }],
                    })(
                        <Input />
                    )}
                 </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label='Last Name'
                    >
                    {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please input your last name!' }],
                    })(
                        <Input />
                    )}
                 </FormItem>
                 <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        UserName&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    )}
                    >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    >
                    {getFieldDecorator('email', {
                        rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                        required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                        required: true, message: 'Please input your password!',
                        }, {
                        validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                    </FormItem>

                    <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                            required: true, message: 'Please confirm your password!',
                            }, {
                            validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                     <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={this.props.loading}>
                        Register
                     </Button>
                        Or <Link to='/login'>Login now!</Link>
                    </FormItem>

            </Form>
                       
          </Spin>
        );
    }
}

const mapStateToProps = state =>{
    console.log(state);
    return{
        loading:state.Register.loading,
        toChat:state.Register.goToChat,
        redirect:state.Register.authRedirect
    }
};
const mapDispatchToProps = dispatch =>{
    return{
        onRegister:(userData) => dispatch(actionCreators.onRegister(userData))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Form.create()(Register)));