import React from 'react'
import { Checkbox } from 'antd'
import { map, propEq, split, filter } from 'ramda'
import { Requests } from './Requests'

const OfferRequests = ({ offers }) => {
  const options = [
    { label: 'Pending Requests', value: 'pending' },
    { label: 'Accepted Requests', value: 'accepted' },
    { label: 'Declined Requests Requests', value: 'declined' },
  ];
  // const defaultCheckedRequests = options
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
      render: shifts => map(shift => <ul className="shifts-list"><li>{shift}</li></ul>, split(',', shifts))
    },
    {
      title: 'Shift Rate (per hour)',
      dataIndex: 'shiftRate',
      key: 'shiftRate',
      render: value => `${value} GBP`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'status-column',
      filters: [{ text: 'Pending Requests', value: 'pending' }, { text: 'Accepted Requests', value: 'accepted' }, { text: 'Declined Requests', value: 'declined' }],
      onFilter: (value, record) => record.status.includes(value)
    }
  ]
  const pendingOffers = filter(propEq('status', 'pending'))(offers)
  // const acceptedOffers = filter(propEq('status', 'accepted'))(offers)
  // const declinedOffers = filter(propEq('status', 'declined'))(offers)
  // console.log('State', requestType)
  return (
    <div className="requests-container">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Offer Requests</h3>
          </div>
          <div>
            <Checkbox
              // indeterminate={value => setIndeterminate(value)}
              // onChange={v => setAllTypes(v)}
              // checked={allTypes}
            >
              Check all
            </Checkbox>
            <br />
            <Checkbox.Group options={options} />
            <Requests offers={pendingOffers} columns={OFFER_COLUMNS} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferRequests
