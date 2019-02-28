import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { postCategory, getCategories, deleteCategory } from '../../actions'
import Categories from './Categories'

class Products extends Component {
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
  }

  deleteCategory = (event) => {
    const { dispatch } = this.props
    const { target: { id } } = event
    dispatch(deleteCategory(id))
  }
  
  render() {
    const { categoryModal } = this.state
    const { categories: { isLoading, categories } } = this.props
    return (
      <div>
        <Categories
          categoryModal={categoryModal}
          showCategoryModal={this.showCategoryModal}
          hideCategoryModal={this.hideCategoryModal}
          addCategory={this.addCategory}
          deleteCategory={this.deleteCategory}
          isLoading={isLoading}
          categories={categories}
        />
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
export default connect(mapStateToProps)(
  reduxForm({
    form: 'category'
  })(Products)
)