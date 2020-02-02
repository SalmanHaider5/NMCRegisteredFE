import React from 'react'
import { Result, Spin } from 'antd'

export const Response = ({ isLoading, code, response }) => {
  
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Result
        status={code}
        title={response.title}
        subTitle={response.message}
      />
    </Spin>
  )
}
