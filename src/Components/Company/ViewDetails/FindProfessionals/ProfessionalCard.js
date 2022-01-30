import React, { useState } from 'react'
import moment from 'moment'
import { defaultTo, equals, find, prop, propEq } from 'ramda'
import { Card, Icon, List, Button, Tooltip } from 'antd'
import { isEmptyOrNull } from '../../../../utils/helpers'
import { NMC_WEB_LINK as nmcUrl, DBS_WEB_LINK as dbsUrl, BAND_LEVELS } from '../../../../constants'
import { CardImageModal } from './CardImageModal'
import { OfferFormModal } from './OfferFormModal'

const ProfessionalCard = (props) => {

  const [imageModal, setImageModal] = useState(false)

  const { professional, showOfferModal } = props
  const {
    userId,
    status,
    fullName,
    profilePicture,
    crbDocument,
    cpdHours,
    shift,
    time,
    nmcPin,
    dateOfBirth,
    qualification
  } = defaultTo({}, professional)

  return (
    <Card
      title={
        <span>
          <Icon type="user" /> {fullName}
          <div className="card-title-extra">{qualification}</div>
        </span>
      }
      extra={
        <span>
          <Icon type={equals(status, 'Female') ? 'woman' : 'man'} /> {status}
        </span>
      }
      actions={[
        <Tooltip title="Professional ID">
          <Button
            type="link"
            onClick={() => setImageModal(true)}
            disabled={isEmptyOrNull(profilePicture)}
          >
            <Icon type="user" />
          </Button>
        </Tooltip>
      ]}
    >
      <List className="professional-details">
        <List.Item>
          <label>
            <Icon type="clock-circle" /> {shift}
          </label>
          <span>{time}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="clock-circle" /> Band Level
          </label>
          <span>{ prop('name', find(propEq('id', cpdHours))(BAND_LEVELS)) }</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="calendar" /> Date of Birth
          </label>
          <span>{moment(dateOfBirth).format('L')}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="mail" /> NMC Pin &nbsp;&nbsp;
            <Tooltip title="Check NMC Pin">
              <a href={nmcUrl} target="_blank" rel="noopener noreferrer">
                <Icon type="link" />
              </a>
            </Tooltip> 
          </label>
          <span>{nmcPin}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="solution" /> DBS Number &nbsp;&nbsp;
            <Tooltip title="Check DBS Number">
              <a href={dbsUrl} target="_blank" rel="noopener noreferrer">
                <Icon type="link" />
              </a>
            </Tooltip>
          </label>
          <span>{crbDocument}</span>
        </List.Item>
        <List.Item>
          <label>
            <Icon type="form" /> Send an Offer 
          </label>
          <Button
            type="primary"
            shape="circle"
            onClick={() => showOfferModal(userId)}
          >
            <Icon type="paper-clip" />
          </Button>
        </List.Item>
      </List>

      <CardImageModal
        {...props}
        imageModal={imageModal}
        setImageModal={setImageModal}
      />

      <OfferFormModal {...props} />

    </Card>
  )
}
export default ProfessionalCard
