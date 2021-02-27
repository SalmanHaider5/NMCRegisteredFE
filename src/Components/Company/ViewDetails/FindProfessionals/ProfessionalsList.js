import React from 'react'
import {  isEmpty } from 'ramda'
import { Empty } from 'antd'
import { CardsList } from './CardsList'

const ProfessionalsList = (props) => {

  const { professionals = [] } = props

  return (
    <>
      {
        isEmpty(professionals) ?
        <Empty description="No professionals available for this search" /> :
        <CardsList {...props} />
      }
    </>
  )
}
export default ProfessionalsList
