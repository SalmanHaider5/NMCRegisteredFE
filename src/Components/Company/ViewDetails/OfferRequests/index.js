import React, { useState } from 'react'
import { Checkbox, Icon } from 'antd'
import { map, split, filter, indexOf, head, propEq, find } from 'ramda'
import { Requests, SingleRequest } from './Requests'
import { ActionButtons } from './ActionButtons'
import { ModalBox } from '../../../../utils/custom-components'

const OfferRequests = ({ offers, requestTypes, indeterminate, allRequests, changeRequestType, changeAllRequestTypes, updateOfferStatus }) => {
  const [offerModal, setOfferModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState('')

  const options = [
    { label: 'Pending Requests', value: 'pending' },
    { label: 'Accepted Requests', value: 'accepted' },
    { label: 'Declined Requests', value: 'declined' },
    { label: 'Approved Shifts', value: 'approved' },
    { label: 'Rejected Shifts', value: 'rejected' },
  ];
  const viewClickHandler = id => {
    setOfferModal(true)
    setSelectedOffer(id)
  }
  const offer = find(propEq('id', selectedOffer))(offers) || {}
  const OFFER_COLUMNS = [
    {
      title: 'Shifts',
      dataIndex: 'shifts',
      key: 'Shifts',
      render: shifts => map(shift => <ul className="shifts-list" key={shift}><li>{head(split('(', shift))}</li></ul>, split(',', shifts))
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
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      className: 'action-column',
      render: (id, row) => <ActionButtons id={id} offer={row} viewClickHandler={viewClickHandler} updateOfferStatus={updateOfferStatus} />}
  ]
  const filteredOffers = filter(offer => indexOf(offer.status, requestTypes) > -1 , offers)
  return (
    <div className="requests-container">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Shift Offers</h3>
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
            submitText={<><Icon type="check" /> Ok</>}
            cancelText={<><Icon type="close" /> Cancel</>}
          />
        </div>
      </div>
    </div>
  )
}

export default OfferRequests
