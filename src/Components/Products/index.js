import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { postCategory } from '../../actions'
import Categories from './Categories'

class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      categoryModal: false
    }
  }

  showCategoryModal = () => {
    this.setState({categoryModal: true})
  }

  hideCategoryModal = () => {
    this.setState({categoryModal: false})
  }

  addCategory = () => {
    const { formValues, dispatch } = this.props
    // console.log(formValues)
    dispatch(postCategory(formValues))
  } 
  
  render() {
    const { categoryModal } = this.state
    return (
      <div>
        <Categories
          categoryModal={categoryModal}
          showCategoryModal={this.showCategoryModal}
          hideCategoryModal={this.hideCategoryModal}
          addCategory={this.addCategory}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('category')(state)
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'category'
  })(Products)
)