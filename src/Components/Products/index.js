import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { getProducts, postProduct, deleteProduct } from '../../actions'
import Products from './Products'

class ProductsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      productModal: false
    }
  }

  componentDidMount(){
    const { dispatch, match: { params: { id } } } = this.props
    dispatch(getProducts(id))
  }

  showProductModal = () => {
    this.setState({productModal: true})
  }

  hideProductModal = () => {
    this.setState({productModal: false})
  }

  addProduct = () => {
    const { formValues, dispatch, match: { params: { id } } } = this.props
    formValues.category = id
    dispatch(postProduct(formValues))
    this.setState({productModal: false})
  }

  deleteProduct = (event) => {
    const { dispatch } = this.props
    const { target: { id } } = event
    dispatch(deleteProduct(id))
  }
  render() {
    
    const { productModal } = this.state
    const { products: { isLoading, products } } = this.props
    
    return (
      <Products
        productModal={productModal}
        showProductModal={this.showProductModal}
        hideProductModal={this.hideProductModal}
        products={products}
        addProduct={this.addProduct}
        isLoading={isLoading}
        deleteProduct={this.deleteProduct}
      />      
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('product')(state),
    products: state.products
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'product'
  })(ProductsContainer)
)