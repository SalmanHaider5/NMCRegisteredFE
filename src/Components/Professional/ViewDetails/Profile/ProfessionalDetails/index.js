import React from 'react'
import { List, Icon, Divider } from 'antd'
import WorkExperience from '../WorkExperience'

const ProfessionalDetails = ({ professional, formValues, userId }) => {
  const {
    nmcPin,
    cpdHours,
    qualification
  } = professional
  return (
    <span>
      <List className="profile-list">
        <List.Item>
          <label>
            <Icon type="profile" />
            NMC Pin
          </label>
          <span className="label-value">{nmcPin}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="highlight" />
            Qualification
          </label>
          <span className="label-value">{qualification}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="hourglass" />
            CPD Hours
          </label>
          <span className="label-value">{cpdHours}</span>
        </List.Item>
      </List>
      <Divider orientation="left">Work Experience</Divider>
      <WorkExperience
        professional={professional}
      />
    </span>
  )
}
export default ProfessionalDetails
