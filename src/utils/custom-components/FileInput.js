import React from 'react'
import { Upload, message, Button, Icon } from 'antd'

export const FileInput = ({
  input: { name, value, onChange, onBlur },
  meta: { touched, error, warning },
  label,
  selectedFile,
  props= {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    data: file => {
      onChange(file)
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  }
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <Upload {...props}>
      <Button>
        <Icon type="upload" /> Attach an Image
      </Button>
    </Upload>
    </div>
  )
}