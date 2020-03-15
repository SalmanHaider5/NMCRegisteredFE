import React from 'react'
import { Typography, Empty } from 'antd'
import { isEmptyOrNull } from '../../../../../utils/helpers'

const WorkExperience = ({ professional }) => {
  const { experience } = professional
  const { Paragraph } = Typography
  return (
    <span>
      {
        isEmptyOrNull(experience) ?
          <Empty /> :
          <Paragraph ellipsis={{ rows: 4, expandable: true }} >
            {experience}
          </Paragraph>
      }
    </span>
  )
}
export default WorkExperience
