import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { getProducts, deleteProduct } from '../../../actions'
import Products from './Products'
import SingleProduct from './SingleProduct'
import NewProduct from './NewProduct'

class ProductsContainer extends Component {
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

  

  deleteProduct = (event) => {
    const { dispatch } = this.props
    const { target: { id } } = event
    dispatch(deleteProduct(id))
  }
  render() {
    const { products: { isLoading, products }, match: { params: { id }, isExact }  } = this.props
    
    return (
      <div>
        {
          isExact?
          <Products
            products={products}
            addProduct={this.addProduct}
            isLoading={isLoading}
            deleteProduct={this.deleteProduct}
            categoryId={id}
          />:
          null
        }
        <Switch>
          <Route path='/categories/:id/products/newProduct' component={NewProduct} />
          <Route path='/categories/:id/products/:productId' component={SingleProduct} />
        </Switch>
      </div>      
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('product')(state),
    products: state.products
  }
}

export default withRouter(connect(mapStateToProps)(
  reduxForm({
    form: 'product'
  })(ProductsContainer)
))