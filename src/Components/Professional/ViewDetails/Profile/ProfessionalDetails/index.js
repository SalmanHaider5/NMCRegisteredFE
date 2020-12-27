import React, { useState } from 'react'
import { List, Icon, Divider, Tooltip, Modal, Avatar, Col, Button } from 'antd'
import { DOCUMENTS_URL as url } from '../../../../../constants'
import { isEmptyOrNull } from '../../../../../utils/helpers'
import WorkExperience from '../WorkExperience'
import { defaultTo } from 'ramda'

export const ProfessionalDetails = (props) => {

  const [imageModal, setImageModal] = useState(false)

  const { profile } = props

  const {
    fullName,
    nmcPin,
    qualification,
    cpdHours,
    crbDocument,
    profilePicture
  } = defaultTo({}, profile)

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 0 }} xl={{ span: 11, offset: 0 }}>
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
              CPD
            </label>
            <span className="label-value">{cpdHours} Hours</span>
          </List.Item>
        </List>
      </Col>
      <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 2 }} xl={{ span: 11, offset: 2 }}>
        <List className="profile-list">
          <List.Item>
            <label>
              <Icon type="audit" />
              DBS Number
            </label>
            <span className="label-value">
              {
                isEmptyOrNull(crbDocument) ?
                `Not added yet` :
                crbDocument
              }
            </span>
          </List.Item>
          <List.Item>
            <label>
              <Icon type="user" />
              Photo ID
            </label>
            <span className="label-value">
              {
                isEmptyOrNull(profilePicture) ? 'Not added yet':
                <Tooltip title="View Profile ID">
                  <Button type="link" onClick={() => setImageModal(true)}>
                    <Avatar src={`${url}${profilePicture}`} />
                  </Button>
                </Tooltip>
              }
            </span>
            <Modal
              visible={imageModal}
              onCancel={() => setImageModal(false)}
              footer={null}
              style={{ top: 20 }}
              bodyStyle={{ padding: 0 }}
            >
              <div className="modal-image">
                <img alt={fullName} src={`${url}${profilePicture}`} style={{ width: '100%'}} />
              </div>
            </Modal>
          </List.Item>
        </List>
      </Col>
      <Col span={24}>
        <Divider orientation="left">Work Experience</Divider>
        <WorkExperience profile={profile}/>
      </Col>
    </>
  )
}
export default ProfessionalDetails
