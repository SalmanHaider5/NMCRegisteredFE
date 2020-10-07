import React, { useState } from 'react'
import { Checkbox, Button } from 'antd'
import { map, split, filter, indexOf, head, propEq, find } from 'ramda'
import { Requests, SingleRequest } from './Requests'
import { ModalBox } from '../../../../utils/custom-components'

const OfferRequests = ({ offers, requestTypes, indeterminate, allRequests, changeRequestType, changeAllRequestTypes }) => {
  const [offerModal, setOfferModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState('')
  const options = [
    { label: 'Pending Requests', value: 'pending' },
    { label: 'Accepted Requests', value: 'accepted' },
    { label: 'Declined Requests Requests', value: 'declined' },
  ];
  const viewClickHandler = id => {
    setOfferModal(true)
    setSelectedOffer(id)
  }
  const offer = find(propEq('id', selectedOffer))(offers) || {}
  const OFFER_COLUMNS = [
    {
      title: 'Offer ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Shifts',
      dataIndex: 'shifts',
      key: 'Shifts',
      render: shifts => map(shift => <ul className="shifts-list"><li>{head(split('(', shift))}</li></ul>, split(',', shifts))
    },
    {
      title: 'Shift Rate (per hour)',
      dataIndex: 'shiftRate',
      key: 'shiftRate',
      render: value => `${value} GBP`
    },
    {
      title: 'Professional Name',
      dataIndex: 'professionalName',
      key: 'professionalName'
    },
    {
      title: 'Professional NMC Pin',
      dataIndex: 'professionalNmc',
      key: 'professionalNmc'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'status-column',
      filters: [{ text: 'Pending Requests', value: 'pending' }, { text: 'Accepted Requests', value: 'accepted' }, { text: 'Declined Requests', value: 'declined' }],
      onFilter: (value, record) => record.status.includes(value)
    },
    {
      title: 'Check Details',
      dataIndex: 'id',
      key: 'id',
      className: 'action-column',
      render: id => <Button type="primary" shape="circle" icon="eye" onClick={() => viewClickHandler(id)} />
    }
  ]
  const filteredOffers = filter(offer => indexOf(offer.status, requestTypes) > -1 , offers)
  return (
    <div className="requests-container">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Offer Requests</h3>
          </div>
          <div>
            <div className="requests-checkbox">
              <Checkbox
                indeterminate={indeterminate}
                onChange={(event) => changeAllRequestTypes(event, options)}
                checked={allRequests}
              >
                All Requests
              </Checkbox>
              <Checkbox.Group options={options} value={requestTypes} onChange={value => changeRequestType(value, options)} />
            </div>
            <Requests offers={filteredOffers} columns={OFFER_COLUMNS} />
          </div>
          <ModalBox
            title="Offer Request"
            size={850}
            visible={offerModal}
            content={<SingleRequest offer={offer} />}
            submitHandler={() => setOfferModal(false)}
            cancelHandler={() => setOfferModal(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default OfferRequests