import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, reset, getFormValues } from 'redux-form'
import { filter, contains, length, toLower } from 'ramda'
import { notification } from 'antd'
import { getCategories, getProducts, postProduct, deleteProduct } from '../../actions'
import { getProductInitialValues } from '../../utils/helpers'
import Products from './Products'

class ProductsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: 1,
      products: []
    }
  }

  componentDidMount(){
    const { dispatch, products: { products } } = this.props
    console.log('Match', this.props.match)
    dispatch(getProducts())
    dispatch(getCategories())
    this.setState({ products })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.products.addRequest !== nextProps.products.addRequest){
      if(!nextProps.products.addRequest){
        notification.success({
          message: 'Add Success',
          description: 'Product is successfully added.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
    if(this.props.products.deleteRequest !== nextProps.products.deleteRequest){
      if(!nextProps.products.deleteRequest){
        notification.success({
          message: 'Delete Success',
          description: 'Product is successfully deleted.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }

  addProduct = () => {
    const { formValues, dispatch, history } = this.props
    dispatch(postProduct(formValues))
    dispatch(reset('product'))
    history.push('/products')
  }

  deleteProduct = id => {
    const { dispatch } = this.props
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

  onSearch = e => {
    const { products: { products }, dispatch } = this.props
    const value = e.target.value 
    if(value.length === 0) { dispatch(getProducts()) }
    const filteredProducts = filter(product => contains(toLower(value), toLower(product.title)), products)
    dispatch({
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: filteredProducts
    })
  }
  
  onSelectFilter = value => {
    const { dispatch } = this.props
    dispatch(getProducts(value))
  }

  isIdDuplicated = value => {
    const { products: { products } } = this.props
    const duplicates = length(filter(product => product.id === value, products))
    return duplicates > 0 ? 'ID is already used' : '' 
  }

  render() {
    const {
      products: { isLoading, products },
      categories: { categories },
      match: { isExact },
      formValues = {},
      valid
    } = this.props
    const { tabKey } = this.state

    const progressScore = (parseInt(tabKey) - 1) * 20 

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
          formValid={valid}
          progress={progressScore} 
          onSearch={this.onSearch}
          isIdDuplicated={this.isIdDuplicated}
          onSelectFilter={this.onSelectFilter}
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
    form: 'product',
    initialValues: getProductInitialValues()
  })(ProductsContainer)
))