import React from 'react'
import { defaultTo } from 'ramda'
import { Row, Col } from 'antd'
import ProfessionalsList from './ProfessionalsList'
import { SearchInitForm } from './SearchInitForm'
import { isEmptyOrNull } from '../../../../utils/helpers'

import './professionals.css'

const FindProfessionas = (props) => {

  const { profile, searchInputValue } = props
  const { isPaid = false } = defaultTo({}, profile)
  
  return (
    <div className="inner-wrapper">
      <div className="steps-content search-content">
        <div className="steps-header">
          <h3>Look for Professionals</h3>
        </div>
        <div className={isPaid ? 'search-container' : 'unpaid-container'}>
          <Row className="search-mobile-message">
            <Col span={24}>
              This module is not supported on Mobile Devices.
            </Col>
          </Row>
          <div className="search-mobile-form">
            <SearchInitForm {...props} />
            <div className="professionals-list">
              {
                isEmptyOrNull(searchInputValue) ? '' : <ProfessionalsList {...props} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindProfessionas
