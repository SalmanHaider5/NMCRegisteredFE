import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset } from 'redux-form'
import { map } from 'ramda'
import { Steps, Button, Row, Col, Icon } from 'antd'
import { createDetails, addPhone, verifyPhone } from '../../actions'
import { getProfessionalFormValues } from '../../utils/helpers'
import BasicForm from './BasicForm'
import AddressForm from './AddressForm'
import Response from './Response'
import AddPhoneForm from './AddPhoneForm'

const { Step } = Steps;

class Professional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      verificationModal: false
    };
  }
  
  next() {
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  showVerificationModal = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
    this.setState({ verificationModal: true })
  }

  saveDetails = () => {
    const { dispatch, match: { params: { userId } }, formValues } = this.props
    dispatch(createDetails(userId, formValues))
    dispatch(reset('professional'))
    this.next()
  }

  verifyProfessionalPhone = () => {
    const { formValues: { phoneCode }, dispatch, match: { params: { userId } } } = this.props
    const values = {}
    values.code = phoneCode
    dispatch(verifyPhone(userId, values))
    dispatch(reset('professional'))
    this.hideVerificationModal()
  }

  hideVerificationModal = () => {
    this.setState({ verificationModal: false })
  }

  prev() {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }
  render() {
    const { current, verificationModal } = this.state
    const { professional: { isLoading, code, response, phoneVerified }, invalid } = this.props
    const steps = [
      {
        title: 'Mobile Verification',
        content:  <AddPhoneForm
                    verificationModal={verificationModal}
                    showVerificationModal={this.showVerificationModal}
                    hideVerificationModal={this.hideVerificationModal}
                    verifyProfessionalPhone={this.verifyProfessionalPhone}
                  />
      },
      {
        title: 'Basic Information',
        content: <BasicForm
                  verificationModal={verificationModal}
                  showVerificationModal={this.showVerificationModal}
                  hideVerificationModal={this.hideVerificationModal}
                />,
      },
      {
        title: 'Address',
        content: <AddressForm />,
      },
      {
        title: 'Done',
        content:  <Response
                    isLoading={isLoading}
                    code={code}
                    response={response}
                  />,
      },
    ]
    return (
      <div>
        <header>
          <div className='signup-headers'>
            <div className='header-body'>
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <p className='logo'>LOGO</p>
                  </Col>
                  <Col xs={15} sm={16} md={16} lg={16} xl={16}></Col>
                  <Col xs={5} sm={4} md={4} lg={4} xl={4}>
                    <Button ghost>Logout</Button>
                  </Col>
                </Row>
              </div>
          </div>
        </header>
          <div className='signup-wrapper'>
              <div className='inner-wrapper'>
                <Steps current={current}>
                    { 
                      map(item => (
                        <Step key={item.title} title={item.title} />
                      ), steps)
                    }
                </Steps>
                <div className="steps-content">
                  <div>
                    {steps[current].content}
                  </div>
                </div>
                <div className="steps-action">
                {
                  current < steps.length - 2 && (
                    <Button className="next-button" type="primary" disabled={!phoneVerified} size="large" onClick={() => this.next()}>
                      Next <Icon type="right" />
                    </Button>
                  )
                }
                {
                  current === steps.length - 2 && (
                    <Button
                      size="large"
                      className="next-button success-btn"
                      type="primary"
                      onClick={this.saveDetails}
                      disabled={invalid}
                    >
                      <Icon type="check" /> Save
                    </Button>
                  )
                }
                {
                  current > 0 && (
                    <Button size="large" className="prev-button" onClick={() => this.prev()}>
                      <Icon type="left" /> Previous
                    </Button>
                  )
                }
              </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    formValues: getFormValues('professional')(state),
    professional: state.professional
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'professional',
    initialValues: getProfessionalFormValues()
  })(Professional)
)
