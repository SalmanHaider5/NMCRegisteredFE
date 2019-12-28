import React from 'react'
import { Field } from 'redux-form'
import { isEmpty, isNil } from 'ramda'
import { Tabs, Card, Progress, Button, Icon } from 'antd'
import { TextField, SelectField, MultilineTextField, FileInput } from '../../../utils/custom-components/'
import { isRequired, isNumber } from '../../../constants'

const { TabPane } = Tabs

const NewProduct = ({
  categories,
  tabKey,
  handleNextTab,
  handlePrevTab,
  handleTabChange,
  formValid,
  formValues,
  formValues: { price, imgs },
  progress,
  addProduct,
  isIdDuplicated
}) => {
  
  return(
    <Card title="Add New Product">
      <Progress
        strokeLinecap="square"
        percent={progress === 80 && !isNil(imgs) ? 100 : progress}
        status={progress === 0 || !formValid ? 'exception' : progress === 100 ? 'success' : 'normal'}
      />
      <Tabs activeKey={`${tabKey}`} onChange={handleTabChange} >
        <TabPane tab="Basic Information" key="1" disabled={parseInt(tabKey) > 2 && isNil(price)}>
          <h2>General</h2>
          <div className="form">
            <div className="form-fields">
              <div className="field">
                <Field
                  name="category"
                  label="Category"
                  component={SelectField}
                  hintText="Choose a Category"
                  options={categories}
                  validate={[isRequired]}
                />
              </div>
            </div>
            <div className="form-fields">
              <div className="field"> 
                <Field
                  name="id"
                  label="Product ID"
                  component={TextField}
                  hintText="Enter ID"
                  type="text"
                  validate={[isRequired, isIdDuplicated]}
                />
              </div>
              <div className="field">
                <Field
                  name="title"
                  label="Product Name"
                  component={TextField}
                  hintText="Enter Product Name"
                  type="text"
                  validate={[isRequired]}
                />
              </div>
            </div>
            <div className="form-buttons">
              <Button
                type="primary"
                onClick={handleNextTab}
                className="next-button"
                disabled={isEmpty(formValues) || !formValid}
              >
                Next <Icon type="right" />
              </Button> 
            </div>
          </div>
        </TabPane>
        <TabPane tab="Dimensions" key="2" disabled={isEmpty(formValues) || !formValid}>
          <h2>Dimensions</h2>
          <div className="form">
            <div className="form-fields">
              <div className="field">
                <Field
                  name="openlength"
                  label="Open Length"
                  component={TextField}
                  hintText="Enter Open Length e.g. 1.1"
                  type="text"
                  validate={[isNumber]}
                />
              </div>
              <div className="field">
                <Field
                  name="handlelength"
                  label="Handle Length"
                  component={TextField}
                  hintText="Enter Handle Length e.g. 1.1"
                  type="text"
                  validate={[isNumber]}
                />
              </div>
            </div>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="bladelength"
                  label="Blade Length"
                  component={TextField}
                  hintText="Enter Blade Length e.g. 1.1"
                  type="text"
                  validate={[isNumber]}
                />
              </div>
            </div>
            <div className="form-buttons">
              <Button type="primary" disabled={isEmpty(formValues) || !formValid} onClick={handleNextTab} className="next-button">
                Next <Icon type="right" />
              </Button>
              <Button type="danger" onClick={handlePrevTab} disabled={isEmpty(formValues) || !formValid} className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
          
        </TabPane>
        <TabPane tab="Price and Shipping" key="3" disabled={tabKey !==3 && (isEmpty(formValues) || !formValid)}>
          <h2>Price and Shipping Details</h2>
          <div className="form">
            <div className="form-fields">
              <div className="field">
                <Field
                  name="price"
                  component={TextField}
                  label="Price"
                  hintText="Price in USD $ e.g. 60"
                  type="text"
                  validate={[isRequired, isNumber]}
                />
              </div>
              <div className="field">
                <Field
                  name="discount"
                  label="Discount"
                  component={TextField}
                  hintText="Discount in Percentage e.g. 10"
                  type="text"
                  validate={[isNumber]}
                />
              </div>
            </div>
            <div className="form-fields">
              <div className="field">
                <Field
                  name="shipping"
                  label="Shipping Charges"
                  component={TextField}
                  hintText="Shipping Charges in USD $ e.g. 10"
                  type="text"
                  validate={[isNumber]}
                />
              </div>
              <div className="field">
                <Field
                  name="stock"
                  label="In Stock"
                  component={TextField}
                  hintText="Enter Quantity e.g. 10"
                  type="text"
                  validate={[isNumber]}
                /> 
              </div>
            </div>
            <div className="form-buttons">
              <Button type="primary" disabled={isEmpty(formValues) || !formValid} onClick={handleNextTab} className="next-button">
                Next <Icon type="right" />
              </Button>
              <Button type="danger" onClick={handlePrevTab} disabled={isEmpty(formValues) || !formValid} className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
          
        </TabPane>
        <TabPane tab="Description and Tips" key="4" disabled={isEmpty(formValues) || isNil(price) || !formValid}>
          <h2>Description and Details</h2>
          <div className="form">
            <div className="form-fields">
              <div className="field">
                <Field
                  name="description"
                  label="Decripton"
                  component={MultilineTextField}
                  rows={4}
                  rowsMax={7}
                  placeholder="Enter Description..."
                />
              </div>
              <div className="field">
                <Field
                  name="tips"
                  label="Tips"
                  component={MultilineTextField}
                  rows={4}
                  rowsMax={7}
                  placeholder="Enter Tips..."
                />
              </div>
            </div>
            <div className="form-buttons">
              <Button
                type="primary"
                onClick={handleNextTab}
                disabled={isEmpty(formValues) || isNil(price)  || !formValid}
                className="next-button"
              >
                Next <Icon type="right" />
              </Button>
              <Button
                type="danger"
                onClick={handlePrevTab}
                disabled={isEmpty(formValues) || isNil(price)  || !formValid}
                className="prev-button"
              >
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Images" key="5" disabled={isEmpty(formValues) || isNil(price) || !formValid}>
          <h2>Images</h2>
          <div className="form">
              <Field
                name="img"
                label="Attach an Image"
                component={FileInput}
              />
            <div className="form-buttons">
              <Button
                type="primary"
                className="save-button"
                disabled={isEmpty(formValues) || !formValid }
                onClick={addProduct}

              >
                <Icon type="check" /> Save
              </Button>
              <Button
                type="danger"
                onClick={handlePrevTab}
                disabled={isEmpty(formValues) || !formValid}
                className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default NewProduct