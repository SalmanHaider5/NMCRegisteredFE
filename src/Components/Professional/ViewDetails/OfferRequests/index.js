import React from 'react'
import { Offers } from './Offers'
import './requests.css'

export const OfferRequests = ({ offers, updateOfferStatus, isLoading }) => {

  return (
    <div className="requests-container">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Shift Offers</h3>
          </div>
          <Offers
            offers={offers}
            updateOfferStatus={updateOfferStatus}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
