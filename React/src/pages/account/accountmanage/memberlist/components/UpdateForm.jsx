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
        {form.getFieldDecorator('id',{
          initialValue: values.id,
        })}

        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="帳號"
        >
          {form.getFieldDecorator('name', {
            initialValue: values.name,
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
          label="信箱"
        >
          {form.getFieldDecorator('email', {
            initialValue: values.email,
            rules: [
              {
                required: true,
                message: '信箱不可空白！',
                // min: 5,
              },
            ],
          })(<Input placeholder="请输入信箱" />)}
        </FormItem>
      
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="名稱"
        >
          {form.getFieldDecorator('Alias', {
            initialValue: values.Alias,
            rules: [
              {
                required: true,
                message: '名稱不可空白！',
                // min: 5,
              },
            ],
          })(<Input placeholder="请输入名稱" />)}
        </FormItem>

        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="電話"
        >
          {form.getFieldDecorator('phone', {
            initialValue: values.phone,
            rules: [
              {
                required: true,
                message: '電話不可空白！',
                // min: 5,
              },
            ],
          })(<Input placeholder="请输入電話" />)}
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
          {form.getFieldDecorator('isEnable', {
            initialValue: values.isEnable,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="N" >关闭</Radio.Button>
              <Radio.Button value="Y" >上线</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>

      </Modal>
    );
  }
}

export default Form.create()(UpdateForm);
