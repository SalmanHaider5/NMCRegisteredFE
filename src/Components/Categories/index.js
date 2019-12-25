import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { notification } from 'antd'
import { postCategory, getCategories, deleteCategory } from '../../actions'
import Categories from './Categories'
import Products from './Products'

class CategoriesContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      categoryModal: false
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getCategories())
  }

  showCategoryModal = () => {
    this.setState({categoryModal: true})
  }

  hideCategoryModal = () => {
    this.setState({categoryModal: false})
  }

  addCategory = () => {
    const { formValues, dispatch } = this.props
    dispatch(postCategory(formValues))
    this.setState({categoryModal: false})
    notification.success({
      message: 'Added',
      description: 'Category is successfully added.',
      placement: 'bottomLeft',
      style: {
        backgroundColor: 'rgb(77, 141, 45)',
        color: '#fff'
      }
    })
  }

  deleteCategory = (id) => {
    const { dispatch } = this.props
    dispatch(deleteCategory(id))
    notification.success({
      message: 'Deleted',
      description: 'Category is successfully deleted.',
      placement: 'bottomLeft',
      style: {
        backgroundColor: 'rgb(77, 141, 45)',
        color: '#fff'
      }
    })
  }
  
  render() {
    const { categoryModal } = this.state
    const { categories: { isLoading, categories }, match: { isExact } } = this.props
    return (
      <div>
        {
          isExact?
          <Categories
            categoryModal={categoryModal}
            showCategoryModal={this.showCategoryModal}
            hideCategoryModal={this.hideCategoryModal}
            addCategory={this.addCategory}
            deleteCategory={this.deleteCategory}
            isLoading={isLoading}
            categories={categories}
          />:
          null
        }
        <Route path="/categories/:id/products" component={Products} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('category')(state),
    categories: state.categories
  }
}
export default withRouter(connect(mapStateToProps)(
  reduxForm({
    form: 'category'
  })(CategoriesContainer)
))