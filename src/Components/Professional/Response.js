import React from 'react'
import { Result, Spin } from 'antd'

const Response = ({ isLoading, code, response }) => {
  console.log('Response', response)
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

export default Response
