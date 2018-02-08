import React, {Component} from "react";
import { Form, Input, Button } from 'antd';
import messageModel from "../js/models/message";
import {connect} from "react-redux";
import topbar from "topbar";
const FormItem = Form.Item;


class MessageBox  extends Component{

      state={
        message:''
    };

    sendClickedHandler=(e)=>{
        e.preventDefault();
        topbar.show();
        // let messageId = this.props.db.ref(`/${this.props.chatId}/`).push().key;
        let message = messageModel(this.props.ownerId,this.state.message);
        this.props.db.ref(`/${this.props.chatId}`).push(message).then(()=>{
            topbar.hide();
            console.log('message sent');
        }).catch((err)=>{
            topbar.hide();
            console.log('message failed',err);
        });
        this.setState({
            message:''
        });
    };

    inputChangeHandler=(e)=>{
        let message = e.target.value;
        if (message.trim() !== ''){
            this.setState({
                message:message
            });
        }
    };

    render(){

        return (
            <Form layout="inline" onSubmit={this.sendClickedHandler}>
                <FormItem >
                <Input 
                placeholder="Enter your message" 
                style={{width:'800px'}} 
                size="large"
                value={this.state.message}
                onChange={this.inputChangeHandler}
                />
                </FormItem>
                <FormItem>
                <Button
                    type="default"
                    htmlType="submit"
                    size="large"
                >
                    Send
                </Button>
                </FormItem>
            </Form>
            );
        }
    }

const mapStateToProps = state=>{
    return{
        ownerId:state.Join.ownerId
    }
};
export default connect(mapStateToProps)(MessageBox);