import React from 'react'
import moment from 'moment'
import { concat, defaultTo, equals } from 'ramda'
import { Card, List } from 'antd'
import { DOCUMENTS_URL as url } from '../../../../constants'
import { isEmptyOrNull } from '../../../../utils/helpers'

export const PaymentReceipt = (props) => {

  const { formValues } = props,
    { vat, balance, paymentMethod } = defaultTo({}, formValues)

  const getPaymentImageSrc = type => {

    const paypal = 'assets/paypal.png',
      card = 'assets/payment.png'

    if(equals(type, 'Paypal'))
      return concat(url, paypal)
    else
      return concat(url, card)
  }

  return (
    <Card title={'Licensing Fee'}>
      <List>
        <div className="payment-logo-container">
          {
            isEmptyOrNull(paymentMethod) ? '' :
            <img alt="Payment Methods" src={getPaymentImageSrc(paymentMethod)} />
          }
        </div>
        <List.Item>
          <label> Date </label>
          <span> {moment().format('LL')} </span>
        </List.Item>
        <List.Item>
          <label>
            <List.Item.Meta
              title="Fee"
              description="Annual Premium"
            />
          </label>
          <span> £ {balance}.00 </span>
        </List.Item>
        <List.Item>
          <label> VAT </label>
          <span> {vat}% </span>
        </List.Item>
        <List.Item className="bill-row">
          <label>
            <List.Item.Meta
              title="Total"
              description="Valid Till"
            />
          </label>
          <span>
            <List.Item.Meta
              className="net-balance"
              title={`£ ${parseInt(balance) + parseInt(balance * vat / 100)}.00`}
              description={moment().add(1, 'years').format('LL')}
            />
          </span>
        </List.Item>
      </List>
    </Card>
  )
}
