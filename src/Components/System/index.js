import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, initialize } from 'redux-form'
import { Tabs, Card, Spin, notification } from 'antd'
import { getBasics, updateBasics } from '../../actions'
import { getSettingsInitialValues } from '../../utils/helpers'
import { Basics } from './Basics'
import Members from './Members'
import Slideshow from './Slideshow'

class SettingsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      basicsReadOnly: true
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.props.settings.updateBasicsRequest !== nextProps.settings.updateBasicsRequest){
      if(!nextProps.settings.updateBasicsRequest){
        notification.success({
          message: 'Update Success',
          description: 'Basic Information is successfully updated',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getBasics())
  }

  editBasicsForm = () => {
    const { dispatch, settings: { basics } } = this.props
    dispatch(initialize('settings', basics))
    this.setState({ basicsReadOnly: false })
  }

  saveBasicsForm = () => {
    const { dispatch, formValues } = this.props
    dispatch(updateBasics(formValues))
    this.setState({ readOnly: true })
  }

  render() {
    const { TabPane } = Tabs
    const { settings: { isLoading, basics } } = this.props
    const { basicsReadOnly } = this.state
    return (
      <div>
        <Card title="System Configuration" className="settings-container">
          <Spin spinning={isLoading} tip="Loading...">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Basic Details" key="1">
                <Basics
                  basics={basics}
                  editBasicsForm={this.editBasicsForm}
                  basicsReadOnly={basicsReadOnly}
                  saveBasicsForm={this.saveBasicsForm}
                />
              </TabPane>
              <TabPane tab="Team Members" key="2">
                <Members />
              </TabPane>
              <TabPane tab="Social Media Links" key="3">
                Social Media Links
              </TabPane>
              <TabPane tab="Slideshow Images" key="4">
                <Slideshow />
              </TabPane>
            </Tabs>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('settings')(state),
    settings: state.settings
  }
}

export default withRouter(connect(mapStateToProps)(
  reduxForm({
    form: 'settings',
    initialValues: getSettingsInitialValues()
  })(SettingsContainer)
))