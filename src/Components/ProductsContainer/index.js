import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { getCategories, getProducts, postProduct, deleteProduct } from '../../actions'
import Products from './Products'

// import SingleProduct from './SingleProduct'

class ProductsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: 1
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getProducts())
    dispatch(getCategories())
  }

  addProduct = () => {
    const { formValues, dispatch, match: { params: { id } } } = this.props
    formValues.category = id
    dispatch(postProduct(formValues))
  }
  
  deleteProduct = event => {
    const { dispatch } = this.props
    const { target: { id } } = event
    dispatch(deleteProduct(id))
  }
  handleTabChange = key => {
    this.setState ({ tabKey: parseInt(key) })
  }
  handleNextTab = () =>{
    const { tabKey } = this.state
    this.setState({ tabKey: parseInt(tabKey) + 1 })
  }
  handlePrevTab = () => {
    const { tabKey } = this.state
    this.setState({ tabKey: parseInt(tabKey) - 1 })
  }

  render() {
    const { products: { isLoading, products }, categories: { categories }, match: { isExact }, formValues = {} } = this.props
    const { tabKey } = this.state
    return (
      <div>
        <Products
          categories={categories}
          products={products}
          addProduct={this.addProduct}
          isLoading={isLoading}
          deleteProduct={this.deleteProduct}
          isExact={isExact}
          tabKey={tabKey}
          handleNextTab={this.handleNextTab}
          handlePrevTab={this.handlePrevTab}
          handleTabChange={this.handleTabChange}
          formValues={formValues}
        />
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('product')(state),
    products: state.products,
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(
  reduxForm({
    form: 'product'
  })(ProductsContainer)
))