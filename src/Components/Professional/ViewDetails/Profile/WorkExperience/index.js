import React from 'react'
import { Typography, Empty } from 'antd'
import { isEmptyOrNull } from '../../../../../utils/helpers'

const WorkExperience = ({ profile }) => {

  const { experience } = profile,
    { Paragraph } = Typography

  return (
    <span>
      {
        isEmptyOrNull(experience) ? <Empty /> :
        <Paragraph ellipsis={{ rows: 4, expandable: true }} strong={true} >
          {experience}
        </Paragraph>
      }
    </span>
  )
}
export default WorkExperience
