import { notification } from 'antd'

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