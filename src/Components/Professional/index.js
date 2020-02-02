import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset } from 'redux-form'
import { map } from 'ramda'
import { Steps, Button, Row, Col, Icon } from 'antd'
import { createDetails, addPhone, verifyPhone, logoutUser, getProfessionalDetails } from '../../actions'
import { Response } from '../../utils/custom-components'
import { getProfessionalFormValues, showToast } from '../../utils/helpers'
import BasicForm from './BasicForm'
import AddressForm from './AddressForm'
import AddPhoneForm from './AddPhoneForm'

const { Step } = Steps;

class Professional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      verificationModal: false
    };
  }

  componentDidMount(){
    const { application: { authentication: { auth, role } }, history, dispatch, match: { params: { userId } } } = this.props
    dispatch(getProfessionalDetails(userId))
    if(!auth && role !== 'professional'){
      history.push('/')
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.professional.professionalDetails !== this.props.professional.professionalDetails){
      const { professional: { professionalDetails: { code, codeType, response: { title, message } } } } = this.props
      if(code === 'success'){
        this.setState({ current: 3 })
      }else{
        this.setState({ current: 1 })
        if(codeType === 1){
          showToast(title, message, code)
          this.setState({ current: 0 })
        }else{
          showToast(title, message, code)
          this.setState({ current: 1 })
        }
      }
    }
  }
  
  next = () => {
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  showVerificationModal = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
  }

  saveDetails = () => {
    const { dispatch, match: { params: { userId } }, formValues } = this.props
    dispatch(createDetails(userId, formValues))
    dispatch(reset('professional'))
    this.next()
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'company'){
      history.push('/')
    }
  }

  verifyProfessionalPhone = () => {
    const { formValues: { phoneCode }, dispatch, match: { params: { userId } } } = this.props
    const values = {}
    values.code = phoneCode
    dispatch(verifyPhone(userId, values))
    dispatch(reset('professional'))
  }

  hideVerificationModal = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
  }

  render() {
    const { current, verificationModal } = this.state
    const { professional: { isLoading, code, phoneVerified, professionalDetails }, invalid } = this.props
    
    const steps = [
      {
        title: 'Mobile Verification',
        content:  <AddPhoneForm
          code={code}
          phoneVerified={phoneVerified}
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
        />
      },
      {
        title: 'Address Details',
        content: <AddressForm />,
      },
      {
        title: 'Done',
        content:  <Response
          isLoading={isLoading}
          code={professionalDetails.code}
          response={professionalDetails.response}
        />
      }
    ]
    console.log(steps[1])
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
                    <Button ghost onClick={this.logout}>Logout</Button>
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
                    <Button className="next-button" type="primary" size="large" onClick={() => this.next()}>
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
                {/*{
                  current > 0 && current < steps.length - 1 (
                    <Button size="large" className="prev-button" onClick={() => this.prev()}>
                      <Icon type="left" /> Previous
                    </Button>
                  )
                } */}
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
    professional: state.professional,
    application: state.signup
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'professional',
    initialValues: getProfessionalFormValues()
  })(Professional)
)
