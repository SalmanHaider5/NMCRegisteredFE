import React from 'react'
import { List, Icon } from 'antd'

const ProfessionalDetails = ({ professional }) => {
  const {
    nmcPin,
    cpdHours,
    qualification
  } = professional
  return (
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
  )
}
export default ProfessionalDetails
