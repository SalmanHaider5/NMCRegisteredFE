import React, { useState } from 'react'
import { length, map, nth, prop, filter, indexOf, equals, isEmpty } from 'ramda'
import { Row, Col, Empty, Card } from 'antd'
import { OFFER_OPTIONS as options } from '../../../../constants'
import { OfferFilterChecks } from './OfferFilterChecks'
import { OffersList } from './OffersList'
import { SingleOffer } from './SingleOffer'

export const Offers = ({ offers, updateOfferStatus }) => {

  const [index, setIndex] = useState(0)
  const [requestTypes, setRequestTypes] = useState(['pending', 'accepted', 'declined', 'approved'])
  const [allTypes, setAllTypes] = useState(true)
  const [indeterminate, setInderminate] = useState(false)

  const changeRequestType = values => {
    setIndex(0)
    setRequestTypes(values)
    setInderminate(length(values) && length(values) < length(options))
    setAllTypes(equals(length(values), length(options)))
  }

  const changeAllTypes = event => {

    const types = event.target.checked ? map(option => prop('value', option), options) : []
    setRequestTypes(types)
    setInderminate(false)
    setAllTypes(event.target.checked)
  }
  const filteredOffers = filter(offer => indexOf(offer.status, requestTypes) > -1 , offers),
    selectedOffer = nth(index, filteredOffers)

  return (
    <Row gutter={16} className="offers-container">
      <OfferFilterChecks
        indeterminate={indeterminate}
        allTypes={allTypes}
        requestTypes={requestTypes}
        changeAllTypes={changeAllTypes}
        changeRequestType={changeRequestType}
      />
      <Card className="offers-list-container">
        <Col xl={6} md={8} lg={8} sm={24} className="list-content">
          <OffersList
            offers={filteredOffers}
            currentIndex={index}
            setIndex={setIndex}
          />
        </Col>
        <Col xl={18} md={16} lg={16} sm={24} className="offer-content">
          {
            isEmpty(filteredOffers) ?
            <Empty /> :
            <SingleOffer selectedOffer={selectedOffer} updateOfferStatus={updateOfferStatus} />
          }
        </Col>
      </Card>
    </Row>
  )
}
