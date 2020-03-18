import React from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Divider } from 'antd'
import WorkExperience from '../WorkExperience'
import { isEmptyOrNull } from '../../../../../utils/helpers'

const ProfessionalDetails = ({ professional, formValues, userId }) => {
  const {
    nmcPin,
    cpdHours,
    qualification,
    document
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
        <List.Item>
          <label>
            <Icon type="hourglass" />
            CV/Resume
          </label>
          <span className="label-value">
            {
              isEmptyOrNull(document) ?
              `Not added yet`:
              <Link to={`/professional/${userId}/resume`}>
                <Icon type="profile" />
                <span>{document}</span>
              </Link>
            }
          </span>
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
