import React, { Component } from 'react'
import { connect } from 'react-redux'
import { split } from 'ramda'
import { Spin, Descriptions, List, Icon, Input, Button, Divider, Popconfirm, notification } from 'antd'

import { getSingleProduct } from '../../../../actions'

class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      product: {}
    }
  }
  
  deleteTip = () => {
    notification.success({
      message: 'Tip Deleted',
      description: 'Tip is successfully deleted.',
      placement: 'bottomLeft',
      style: {
        backgroundColor: '#000',
        color: 'white',
        opacity: '1'
      }
    })
  }
  addTip = () => {
    notification.success({
      message: 'New Tip',
      description: 'Tip is successfully added.',
      placement: 'topRight',
      style: {
        backgroundColor: '#000',
        color: 'white',
        opacity: '1'
      }
    })
  }

  componentDidMount(){
    const { dispatch, match: { params: { productId } } } = this.props
    dispatch(getSingleProduct(productId))
    
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList });
  render() {
      const {
        products:{
          isLoading = true,
          product:{
            id,
            title,
            price,
            discount,
            openlength,
            bladelength,
            handlelength,
            tips = '',
            description
          }
        }
      } = this.props
      
      const { Item } = Descriptions
      
      let netPrice = 0
      if(!isLoading){
        netPrice = price - (price*discount/100)
      }
    return (
      <Spin spinning={isLoading} tip='Loading...'>
        <div className="product-description">
          <Descriptions title="Product Details" bordered>
            <Item label="ID">
              {id}
            </Item>
            <Item label="Name" span={2}>
              {title}
            </Item>
            <Item label="Price">
              USD ${price}
            </Item>
            <Item label="Discount">
              {discount}%
            </Item>
            <Item label="Net Price">
              USD ${netPrice}
            </Item>
            <Item label="Open Length">
              {openlength}''
            </Item>
            <Item label="Blade Length">
              {bladelength}''
            </Item>
            <Item label="Handle Length">
              {handlelength}''
            </Item>
            <Item label="Tips" span={2}>
              <List
                dataSource={split(';', tips)}
                renderItem={tip => 
                  <List.Item>
                    {tip}
                    <span className="list-delete-icon">
                      <Popconfirm placement="right" title="Are you sure to delete it?" onConfirm={this.deleteTip} okText="Yes" cancelText="No">
                        <Icon type="delete" theme="filled"/>
                      </Popconfirm>
                    </span>
                  </List.Item>
                }
              />
            </Item>
            <Item label="Add New Tip">
              <Input type="text" />
              <Divider className="small-divider" />
              <Button block={true} type="primary" onClick={this.addTip}>
                <Icon type="check" /> Save
              </Button>
            </Item>
            <Item label="Description" span={3}>
              {description} 
            </Item>
          </Descriptions>
          <br />
        </div>
      </Spin>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(SingleProduct)