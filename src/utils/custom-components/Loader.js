import React from 'react'
import { Spin, Icon } from 'antd'

export const Loader = ({
  size,
  isLoading,
  wrapper,
  loadingText
}) => {
  return (
    <>
      <Spin
        size={size}
        spinning={isLoading}
        tip={loadingText}
        indicator={<Icon type="loading" style={{ fontSize: 24 }} />}
      >
        {wrapper}
      </Spin>
    </>
  )
}
