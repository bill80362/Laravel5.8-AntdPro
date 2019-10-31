import { Form, Input, Modal, Radio } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const CreateForm = props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新增代理帳號"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
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
        label="密碼"
      >
        {form.getFieldDecorator('password', {
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
        label="帳號"
      >
        {form.getFieldDecorator('name', {
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
        label="名稱"
      >
        {form.getFieldDecorator('Alias', {
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
          initialValue: 'N',
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="N">关闭</Radio.Button>
            <Radio.Button value="Y">上线</Radio.Button>
          </Radio.Group>
        )}
      </FormItem>



    </Modal>
  );
};

export default Form.create()(CreateForm);
