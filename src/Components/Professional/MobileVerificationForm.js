import React from 'react'
import { Form, Input } from 'antd'

const MobileVerificationForm = () => {
  return (
    <div>
      <p>If you have not received your code, please click on Resend button</p>
      <Form.Item
        label={'Code'}
        colon={false}
        labelAlign='left'
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17, offset: 1 }}
      >
        <Input />
      </Form.Item>
    </div>
  )
}

export default MobileVerificationForm;
