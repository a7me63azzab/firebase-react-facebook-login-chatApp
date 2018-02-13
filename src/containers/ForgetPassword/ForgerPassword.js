import React ,{Component} from "react";
import { Modal, Form, Input } from 'antd';
import axios from "../../axios_base";
const FormItem = Form.Item;


class ForgetPassword extends Component {

    state={
        visible:false
    }

    

    // to inital state with the coming props 
    componentWillReceiveProps(nextProps){
        this.setState({ visible: nextProps.visible })
      }

  onCancel = () => {
    this.setState({
        visible:false
    });
    console.log('cancel');
  }
  onSend = () => {
      console.log(this.state.visible);
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      axios.post('/forgetpassword',values).then(res=>{
        console.log(res.data);
        form.resetFields();
        // this.setState({ visible: false });
        this.onCancel();
        }).catch(err=>{
        console.log('error',err);
        });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Modal
        visible={this.state.visible}
        title="Please enter your e-mail"
        okText="Send"
        onCancel={this.onCancel}
        onOk={this.onSend}
        >
        <Form >
            <FormItem
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
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ForgetPassword);

