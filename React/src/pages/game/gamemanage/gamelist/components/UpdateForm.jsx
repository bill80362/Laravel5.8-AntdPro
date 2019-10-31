import { Button, DatePicker, Form, Input, Modal, Radio, Select, Steps } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

class UpdateForm extends Component {
  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  okHandle = () => {
    const { form, handleUpdate } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values, form } = this.props;
    return (
      <Modal
        width={640}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        onOk={this.okHandle}
      >

        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="帳號"
        >
          {form.getFieldDecorator('account', {
            initialValue: values.account,
            rules: [
              {
                required: true,
                message: '帳號不可空白！',
                // min: 5,
              },
            ],
          })(<Input placeholder="请输入帳號" />)}
        </FormItem>

        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="密碼"
        >
          {form.getFieldDecorator('passwd', {
            initialValue: values.passwd,
            rules: [
              {
                required: true,
                message: '请输入至少六个字符的密碼！',
                min: 6,
              },
            ],
          })(<Input placeholder="请输入密碼" type="password" />)}
        </FormItem>

        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="狀態"
        >
          {form.getFieldDecorator('status', {
            initialValue: values.status,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={0} >关闭</Radio.Button>
              <Radio.Button value={1} >上线</Radio.Button>
              <Radio.Button value={2} >異常</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>

      </Modal>
    );
  }
}

export default Form.create()(UpdateForm);
