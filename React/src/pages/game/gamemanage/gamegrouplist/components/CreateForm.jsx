import { Form, Input, Modal, Radio, Select } from 'antd';
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
      title="新增項目分類"
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
        label="供應商"
      >
        {form.getFieldDecorator('GameProvider', {
          initialValue: "",
          rules: [
            {
              required: true,
              message: '请输入供應商',
            },
          ],
        })(
            <Select placeholder="请输入供應商" style={{ width: 200 }}>
              <Select.Option value="AB">AB</Select.Option>
              <Select.Option value="CD">CD</Select.Option>
              <Select.Option value="LKK">LKK</Select.Option>
              <Select.Option value="LU">LU</Select.Option>
              <Select.Option value="BB">BB</Select.Option>
            </Select>
        )}
      </FormItem>

      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="分類"
      >
        {form.getFieldDecorator('GameTagID', {
          initialValue: "",
          rules: [
            {
              required: true,
              message: '请输入分類',
            },
          ],
        })(
          <Select placeholder="请输入分類" style={{ width: 200 }}>
          <Select.Option value="1">分類1號</Select.Option>
          <Select.Option value="2">分類2號</Select.Option>
          <Select.Option value="3">分類3號</Select.Option>
          <Select.Option value="4">分類4號</Select.Option>
          <Select.Option value="5">分類5號</Select.Option>
        </Select>
        )}
      </FormItem>

      <FormItem
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 15,
        }}
        label="排序"
      >
        {form.getFieldDecorator('Seq', {
          initialValue: "",
          rules: [
            {
              required: true,
              message: '请输入排序權重',
            },
          ],
        })(<Input placeholder="请输入排序權重" style={{ width: 200 }} />)}
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
        {form.getFieldDecorator('Status', {
          initialValue: "Y",
          rules: [
            {
              required: true,
              message: '请输入狀態',
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
