import React from 'react'
import { Field } from 'redux-form'
import { isNil } from 'ramda'
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
  formValues: {
    category,
    id,
    title,
    openlength,
    bladelength,
    handlelength,
    decription,
    tips,
    imageOne,
    imageTwo
  }
}) => {
  const categoryScore = isNil(category) ? 0 : 10
  const idScore = isNil(id) ? 0 : 5
  const titleScore = isNil(title) ? 0 : 5
  const generalScore = categoryScore + idScore + titleScore
  return(
    <Card title="Add New Product">
      <Tabs activeKey={`${tabKey}`} onChange={handleTabChange} >
        <TabPane tab="Basic Information" key="1">
          <h2>General</h2>
          <div className="form">
            <div className="field">
              <Field
                name="category"
                component={SelectField}
                hintText="Choose a Category"
                options={categories}
                validate={[isRequired]}
              />
            </div>
            <div className="field">
              <Field
                name="id"
                component={TextField}
                hintText="Enter ID"
                type="text"
                validate={[isRequired]}
              />
            </div>
            <div className="field">
              <Field
                name="title"
                component={TextField}
                hintText="Enter Product Name"
                type="text"
                validate={[isRequired]}
              />
            </div>
            <div className="field">
              <Button
                type="primary"
                onClick={handleNextTab}
                className="next-button"
                disabled={generalScore === 20 ? false : true}
              >
                Next <Icon type="right" />
              </Button>
            </div>
          </div>
          <div className="progress">
            <Progress
              type="circle"
              percent={generalScore}
            />
          </div>
        </TabPane>
        <TabPane tab="Dimensions" disabled={generalScore < 20} key="2">
          <h2>Dimensions</h2>
          <div className="form">
            <div className="field">
              <Field
                name="openlength"
                component={TextField}
                hintText="Enter Open Length e.g. 1.1"
                type="text"
              />
            </div>
            <div className="field">
              <Field
                name="handlelength"
                component={TextField}
                hintText="Enter Handle Length e.g. 1.1"
                type="text"
              />
            </div>
            <div className="field">
              <Field
                name="bladelength"
                component={TextField}
                hintText="Enter Blade Length e.g. 1.1"
                type="text"
              />
            </div>
            <div className="field">
              <Button type="primary" onClick={handleNextTab} className="next-button">
                Next <Icon type="right" />
              </Button>
              <Button type="danger" onClick={handlePrevTab} className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
          <div className="progress">
            <Progress type="circle" percent={40} />
          </div>
        </TabPane>
        <TabPane tab="Price and Discount" disabled={generalScore < 20} key="3">
          <h2>Price and Discount</h2>
          <div className="form">
            <div className="field">
              <Field
                name="price"
                component={TextField}
                hintText="Price e.g. 60"
                type="text"
                validate={[isRequired, isNumber]}
              />
            </div>
            <div className="field">
              <Field
                name="discount"
                component={TextField}
                hintText="Discount in Percent e.g. 10"
                type="text"
                validate={[isNumber]}
              />
            </div>
            <div className="field">
              <Button type="primary" onClick={handleNextTab} className="next-button">
                Next <Icon type="right" />
              </Button>
              <Button type="danger" onClick={handlePrevTab} className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
          <div className="progress">
            <Progress type="circle" percent={60} />
          </div>
        </TabPane>
        <TabPane tab="Description and Tips" disabled={generalScore < 20} key="4">
          <h2>Description and Details</h2>
          <div className="form">
            <div className="field">
              <Field
                name="description"
                component={MultilineTextField}
                rows={4}
                rowsMax={7}
                placeholder="Enter Description..."
              />
            </div>
            <div className="field">
              <Field
                name="tips"
                component={MultilineTextField}
                rows={4}
                rowsMax={7}
                placeholder="Enter Tips..."
              />
            </div>
            <div className="field">
              <Button type="primary" onClick={handleNextTab} className="next-button">
                Next <Icon type="right" />
              </Button>
              <Button type="danger" onClick={handlePrevTab} className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
          <div className="progress">
            <Progress type="circle" percent={80} />
          </div>
        </TabPane>
        <TabPane tab="Images" disabled={generalScore < 20} key="5">
          <h2>Images</h2>
          <div className="form">
            <div className="field">
              <Field
                name="imgOne"
                component={FileInput}
                label="Attach Image 1"
                validate={[isRequired]}
              />
            </div>
            <div className="field">
              <Field
                name="imgTwo"
                label="Attach Image 2"
                component={FileInput}
              />
            </div>
            <div className="field">
              <Field
                name="imgThree"
                label="Attach Image 3"
                component={FileInput}
              />
            </div>
            <div className="field">
              <Field
                name="imgFour"
                label="Attach Image 4"
                component={FileInput}
              />
            </div>
            <div className="field">
              <Field
                name="imgFive"
                label="Attach Image 5"
                component={FileInput}
              />
            </div>
            <div className="field save-buttons">
              <Button type="primary" className="save-button">
                Save <Icon type="check" />
              </Button>
              <Button type="danger" onClick={handlePrevTab} className="prev-button">
                <Icon type="left" /> Back
              </Button>
            </div>
          </div>
          <div className="progress">
            <Progress type="circle" percent={100} />
          </div>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default NewProduct