import React from 'react'
import { SingleRequest } from './SingleRequest'
import './requests.css'

export const OfferRequests = ({ offers, updateOfferStatus, isLoading }) => {
  return (
    <div className="requests-container">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Offer Requests</h3>
          </div>
          <SingleRequest
            offers={offers}
            updateOfferStatus={updateOfferStatus}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
