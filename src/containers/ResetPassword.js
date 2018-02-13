import React,{ Component } from "react";
import axios from "../axios_base";
import {Form, Input, Button} from "antd";
import {withRouter} from "react-router-dom";
const FormItem = Form.Item;

class ResetPassword extends Component{
    
    state = {
        confirmDirty: false
      };

      /*
        {
        "newPassword":"blender",
        "confirmNewPassword":"blender",
        "resetpasswordKey":"DIHsZxkRuJsiDKy52mGzhZX"
        }
      */

      getResetKey=( name, url )=> {
        if (!url) url = window.location.href;
        // name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        name = name.replace(/[[]/,"\\[").replace(/[\]]/,"\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }


    submitClickedHandler=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            console.log('values ==++>',values);
            //--------------
            var newPassword={
                newPassword:values.password,
                confirmNewPassword:values.confirm
            }
            console.log(newPassword);

            console.log('url',window.location.href);
                var resetKey = this.getResetKey('resetpasswordkey', window.location.href);
                console.log('Key:',resetKey);
                axios.post(`/resetpassword/${resetKey}`,newPassword).then(res=>{
                    console.log(res.data);
                }).catch(err=>{
                    console.log(err);
                    console.log('faild');
                });
           // ----------
            this.props.history.push('/login');
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

    render(){
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
            <Form onSubmit={this.submitClickedHandler} >
       
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
                     <Button type="primary" htmlType="submit" loading={this.props.loading}>Update</Button>
                    </FormItem>

            </Form>
        );
    }
}


export default withRouter(Form.create()(ResetPassword));