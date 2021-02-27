import React, { useState } from 'react'
import { filter, indexOf } from 'ramda'
import { Row } from 'antd'
import { Requests } from './Requests'
import { FilterChecks } from './FilterChecks'

const OfferRequests = (props) => {

  const [index, setIndex] = useState(0)

  const { offers = [], requestTypes, updateOfferStatus } = props
  
  const filteredOffers = filter(offer => indexOf(offer.status, requestTypes) > -1 , offers)

  return (
    <div className="requests-container">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Shift Offers</h3>
          </div>
          <Row className="offers-container">
            <div className="requests-checkbox">
              <FilterChecks {...props} />
            </div>
            <Requests
              currentIndex={index}
              offers={filteredOffers}
              setIndex={setIndex}
              updateOfferStatus={updateOfferStatus}
            />
          </Row>
        </div>
      </div>
    </div>
  )
}

export default OfferRequests
