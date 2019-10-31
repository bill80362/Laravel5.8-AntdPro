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
        label="供應商"
      >
        {form.getFieldDecorator('GameProvider', {
          initialValue: values.GameProvider,
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
          initialValue: values.GameTagID,
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
          initialValue: values.Seq,
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
          initialValue: values.Status,
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
  }
}

export default Form.create()(UpdateForm);
