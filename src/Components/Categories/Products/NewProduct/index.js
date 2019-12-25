import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { TextField } from '../../../../utils/custom-components/'
import { isRequired, isNumber } from '../../../../constants'
import { postProduct } from '../../../../actions'

class NewProduct extends Component {

  addProduct = () => {
    const { formValues, dispatch, match: { params: { id } } } = this.props
    formValues.category = id
    dispatch(postProduct(formValues))
  }
  render(){

    return (
      <div>
        <form onSubmit={this.addProduct}>
          <div>
            <h3 className="form-header-title">Product Information</h3>
            <Field
              name="id"
              component={TextField}
              type="text"
              label="Product ID"
              validate={[isRequired]}
            />
            <Field
              name="title"
              component={TextField}
              type="text"
              label="Product Name"
              validate={[isRequired]}
            />
          </div>
          <div className="price-container">
            <h3 className="form-header-title">Price</h3>
            <Field
              name="price"
              component={TextField}
              type="text"
              label="Price (USD)"
              validate={[isRequired, isNumber]}
            />
            <Field
              name="discount"
              component={TextField}
              type="text"
              label="Discount (%)"
              validate={[isNumber]}
            />
          </div>
          <div className="dimensions-container">
            <h3 className="form-header-title">Dimensions</h3>
            <Field
              name="openlength"
              component={TextField}
              type="text"
              label="Open Length"
              validate={[isNumber]}
            />
            <Field
              name="bladelength"
              component={TextField}
              type="text"
              label="Blade Length"
              validate={[isNumber]}
            />
            <Field
              name="handlelength"
              component={TextField}
              type="text"
              label="Handle Length"
              validate={[isNumber]}
            />
          </div>
          {/* <div className="field">
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="Category Name"
              className="category-name"
            />
          </div> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    formValues: getFormValues('product')(state)
  }
}

export default withRouter(connect(mapStateToProps)(
  reduxForm({
    form: 'product'
  })(NewProduct)
))