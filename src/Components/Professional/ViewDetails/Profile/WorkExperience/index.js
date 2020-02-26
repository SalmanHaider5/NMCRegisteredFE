import React from 'react'
import { Typography, Empty } from 'antd'

const WorkExperience = ({ professional }) => {
  const { experience } = professional
  const { Paragraph } = Typography
  return (
    <span>
        {
            experience ?
            <Paragraph
                ellipsis={{
                    rows: 4,
                    expandable: true
                }}
            >
                {experience}
            </Paragraph> :
            <Empty />
        }
    </span>
  )
}
export default WorkExperience
