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
        label="帳號"
      >
        {form.getFieldDecorator('account', {
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
          initialValue: 0,
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Radio.Group buttonStyle="solid">
          <Radio.Button value="0">关闭</Radio.Button>
          <Radio.Button value="1">上线</Radio.Button>
          </Radio.Group>
        )}
      </FormItem>



    </Modal>
  );
};

export default Form.create()(CreateForm);
