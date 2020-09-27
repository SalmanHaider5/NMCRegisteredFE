import React, { useState } from 'react'
import { Row, Col, List, Icon, Descriptions, Checkbox, Button, Empty, Popconfirm, Spin } from 'antd'
import { length, map, nth, prop, split, filter, indexOf, defaultTo } from 'ramda'

export const SingleRequest = ({ offers, updateOfferStatus, isLoading }) => {
  const options = [
    { label: 'Pending Requests', value: 'pending' },
    { label: 'Accepted Requests', value: 'accepted' },
    { label: 'Declined Requests Requests', value: 'declined' },
  ];
  const [index, setIndex] = useState(0)
  const [requestTypes, setRequestTypes] = useState(['pending'])
  const [allTypes, setAllTypes] = useState(false)
  const [indeterminate, setInderminate] = useState(true)

  const changeRequestType = values => {
    setIndex(0)
    setRequestTypes(values)
    setInderminate(!!length(values) && length(values) < length(options))
    setAllTypes(length(values) === length(options))
  }

  const changeAllTypes = event => {
    const types = event.target.checked ? map(option => prop('value', option), options) : []
    setRequestTypes(types)
    setInderminate(false)
    setAllTypes(event.target.checked)
  }

  const filteredOffers = filter(offer => indexOf(offer.status, requestTypes) > -1 , offers)
  const selectedOffer = nth(index, filteredOffers)

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Row gutter={16} className="offers-container">
        <div className="requests-checkbox">
          <Checkbox
            indeterminate={indeterminate}
            onChange={(event) => changeAllTypes(event, options)}
            checked={allTypes}
          >
            All Requests
          </Checkbox>
          <Checkbox.Group options={options} value={requestTypes} onChange={value => changeRequestType(value, options)} />
        </div>
        <Col span={6} className="list-content">
          <List
            rowKey="id"
            dataSource={filteredOffers}
            renderItem={(offer={}, i) => (
              <List.Item className={index === i ? 'active-list-item' : 'list-item' } onClick={() => setIndex(i)}>
                <List.Item.Meta
                  title={<><Icon type="tag" /> &nbsp;&nbsp; {prop('companyFirstName', offer)} {prop('companyLastName', offer)}</>}
                  description={`£ ${offer.shiftRate} per hour`}
                />
                <div className="list-arrow">
                  <Icon type="arrow-right" />
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={18} className="offer-content">
          {
            length(filteredOffers) > 0 ?
            <>
              <Descriptions
                bordered
                title="Offer Details"
              >
                <Descriptions.Item label="Company Name" span={2}>{selectedOffer.companyFirstName + ' ' + selectedOffer.companyLastName}</Descriptions.Item>
                <Descriptions.Item label="Shift Rate" span={2}>GBP {selectedOffer.shiftRate} per Hour</Descriptions.Item>
                <Descriptions.Item label="Company Address" span={4}>{selectedOffer.address}</Descriptions.Item>
                <Descriptions.Item label="Shifts" span={4}>
                  <ul>{map(shift => <li key="shift">{shift}</li>, split(',', defaultTo('', selectedOffer.shifts)))}</ul>
                </Descriptions.Item>
                <Descriptions.Item label="Message" span={2}>{selectedOffer.message}</Descriptions.Item>
                <Descriptions.Item label="Status" span={1} className="offer-status">{selectedOffer.status}</Descriptions.Item>
              </Descriptions>
              {
                selectedOffer.status === 'pending' ?
                <div className="action-buttons">
                  <Popconfirm
                    title="Are you sure to decline this offer?"
                    okText="Yes"
                    onConfirm={() => updateOfferStatus(selectedOffer.id, 'declined')}
                    cancelText="No"
                  >
                    <Button type="danger">
                      <Icon type="close" /> Decline
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Are you sure to accept this offer?"
                    okText="Yes"
                    onConfirm={() => updateOfferStatus(selectedOffer.id, 'accepted')}
                    cancelText="No"
                  >
                    <Button className="success-btn">
                      <Icon type="check" /> Accept
                    </Button>
                  </Popconfirm>
                </div>
                : ''
              }
            </>
            : <Empty />
          }
        </Col>
      </Row>
    </Spin>
  )
}
