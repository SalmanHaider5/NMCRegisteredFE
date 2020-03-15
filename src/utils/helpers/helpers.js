import { notification } from 'antd'
import { addIndex, map, isEmpty, isNil, equals } from 'ramda'

const getClassName = (type)  =>{
    switch (type) {
        case 'success':
            return 'ant-notification-notice-success'
        case 'info':
            return 'ant-notification-notice-info'
         case 'warning':
            return 'ant-notification-notice-warning'
        case 'error':
            return 'ant-notification-notice-error'
        default:
            return 'ant-notification-notice'
    }
}

export const showToast = (title, message, type)  => {
    notification[type]({
        message: title,
        description: message,
        className: getClassName(type)
    })
}

export const mapIndexed = addIndex(map)
export const isEmptyOrNull = value => isEmpty(value) || isNil(value) || equals(value, 'null') ? true : false

export const getFormData = formValues => {
    const formData = new FormData()
    for(const key in formValues){
        if(key === 'file'){
            formData.append(key, formValues[key][0])
        }else{
            formData.append(key, formValues[key])
        }
    }
    return formData
}