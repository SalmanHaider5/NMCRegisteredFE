import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { map, sum, isNil } from 'ramda'
import { getSingleOrder, getSingleCustomer, updateOrderStatus } from '../../../actions'
import { SelectField } from '../../../utils/custom-components/'
import { Card, Table, Divider, Icon, Button, notification } from 'antd'

class SingleOrder extends Component {

  componentWillReceiveProps(nextProps){
    if(this.props.orders.updateRequest !== nextProps.orders.updateRequest){
      if(!nextProps.orders.updateRequest){
        notification.success({
          message: 'Update Success',
          description: 'Order status is successfully added.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }

  componentDidMount() {
    const { dispatch, match: { params: { id, customerId } } } = this.props;
    dispatch(getSingleOrder(id));
    dispatch(getSingleCustomer(customerId));
  }

  getStatusName = id => {
    if(id === 1){
      return 'Cancelled'
    }
    if(id === 2){
      return 'Delivered'
    }
  }

  updateStatus = () => {
    const { dispatch, match: { params: { id } }, formValues } = this.props
    if(!isNil(formValues)){
      const { status } = formValues
      const statusName = this.getStatusName(status)
      dispatch(updateOrderStatus({ id, status: statusName }))
    }else{
      notification.error({
        message: 'Update Error',
        description: 'Please select a status',
        placement: 'topRight',
        style: {
          backgroundColor: 'rgb(77, 141, 45)',
          color: '#fff'
        }
      })
    }
  }

  getNetPrice = (price, quantity, discount, shipping) =>{
    const totalPrice = parseInt(price) * parseInt(quantity)
    const totalShipping = parseInt(shipping) * parseInt(quantity)
    const discountInPrice = parseInt(discount) * parseInt(totalPrice) / 100
    const finalPrice = totalPrice - discountInPrice
    let discountedShipping = totalShipping
    if(parseInt(quantity) > 1 && parseInt(quantity) < 5){
      discountedShipping = totalShipping * 30 /100
    }else if(parseInt(quantity) > 5){
      discountedShipping = totalShipping * 50 /100
    }
    return finalPrice + discountedShipping
  }
  
  getTotalPrice = () => {
    console.log(this.props.orders.order.products)
    const { orders: { order: { products = [] } } } = this.props
    const totalPrice = map(product => parseInt(this.getNetPrice(product.price, product.quantity, product.discount, product.shipping)), products)
    return(
      <div className="footer">
        <b className="price-label">Total Price: </b>
        <span>USD ${sum(totalPrice)}</span>
      </div>
    )
  }

  render() {
    const { orders: { order, order: { products } }, customers: { customer } } = this.props
    const { Column } = Table
    return(
      <div className="orders-card">
        <Card title={`Order: ${order.tracking}`}>
          <div className="order-details">
            <div className="customer-info">
              <Divider>Customer's Details</Divider>
              <div className="label-info">
                <span className="label">
                  <Icon type="user" />
                </span>
                <span className="info">{customer.name}</span>
              </div>
              <Divider />
              <div className="label-info">
                <span className="label">
                  <Icon type="mail" />
                </span>
                <span className="info">{customer.email}</span>
              </div>
              <Divider />
              <div className="label-info">
                <span className="label">
                  <Icon type="phone" />
                </span>
                <span className="info">{customer.phone}</span>
              </div>
              <Divider />
              <div className="label-info">
                <span className="label">
                  <Icon type="environment" />
                </span>
                <span className="info">{customer.address}</span>
              </div>
            </div>
            <div className="order-status">
              <Divider>Order's Information</Divider>
              <div className="label-info">
                <span className="label">
                  <Icon type="calendar" />
                </span>
                <span className="info">{order.date}</span>
              </div>
              <Divider />
              <div className="label-info">
                <span className="label">
                  <Icon type="database" />
                </span>
                <span className="info">{order.tracking}</span>
              </div>
              <Divider />
              <div className="label-info">
                <span className="label">
                  <Icon type="info-circle" />
                </span>
                <span className="info">{order.status}</span>
              </div>
              <Divider />
              <div className="label-info">
                <span className="label field-label">
                  <Field
                    name="status"
                    component={SelectField}
                    hintText="Update Status"
                    options={[{id: 1, name: 'Cancelled'}, {id: 2, name: 'Delivered'}]}
                  />
                </span>
                <span className="info">
                  <Button type="primary" onClick={this.updateStatus}>
                    <Icon type="check" className="update-icon" />
                  </Button>
                </span>
              </div>
            </div>
          </div>
          <Divider>Order Details</Divider>
          <Table
            dataSource={products}
            rowKey={product => product.product}
            size="middle"
            footer={() => this.getTotalPrice()}
            pagination={false}
          >
            <Column
              title="Product ID"
              dataIndex="product"
            />
            <Column
              title="Product Name"
              dataIndex="title"
            />
            <Column
              title="Price"
              dataIndex="price"
              render={price => `USD $${price}`}
            />
            <Column
              title="Quantity"
              dataIndex="quantity"
            />
            <Column
              title="Discount"
              dataIndex="discount"
              render={discount => `${discount}%`}
            />
            <Column
              title="Shipping Charges"
              dataIndex="shipping"
              render={shipping => `USD $${shipping}`}
            />
            <Column
              title="Net Price"
              dataIndex="netprice" 
              render={(price, product) => (`USD $${this.getNetPrice(product.price, product.quantity, product.discount, product.shipping)}`) }
            />
          </Table>
        </Card>
      </div>
    );
  }    
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('order')(state),
    orders: state.orders,
    customers: state.customers
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'order'
  })(SingleOrder)
)