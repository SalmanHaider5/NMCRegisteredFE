import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, FormSection } from 'redux-form'
import { isNil, prop, equals } from 'ramda'
import { Row, Col, Button, Spin, Icon } from 'antd'
import { register, verifyAccount, userLogin, generatePasswordResetLink, verifyLogin } from '../../actions'
import { TITLE } from '../../constants'
import { ModalBox } from '../../utils/custom-components'
import { getUsersFormValues, isEmptyOrNull } from '../../utils/helpers'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import ForgetPasswordForm from './ForgetPasswordForm'
import TwoFactorAuthForm from './TwoFactorAuthForm'
import './home.css'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: '',
      loginModal: false,
      forgetPassword: false
    }
  }

  componentDidMount(){
    const { match: { params }, dispatch } = this.props
    if(!isNil(prop('token', params))){
      dispatch(verifyAccount({ userId: params.userId, token: params.token  }))
    }
  }

  selectUser = (type) => {
    this.setState({ selected: type })
  }

  registerUser = () => {
    const { formValues: { signup: { email, password } }, dispatch } = this.props
    const { selected } = this.state
    dispatch(register({ email, password, role: selected }))
    dispatch(reset('users'))
  }

  showLoginModal = () => {
    this.setState({ loginModal: true })
  }

  hideLoginModal = () => {
    const { dispatch } = this.props
    dispatch(reset('users'))
    this.setState({ loginModal: false })
  }

  login = () => {
    const { formValues: { login }, dispatch } = this.props
    dispatch(userLogin(login))
  }

  showForgetPasswordForm = () => {
    this.setState({ forgetPassword: true })
  }

  showLoginForm = () => {
    this.setState({ forgetPassword: false })
  }

  sendPasswordResetLink = () => {
    const { formValues: { forgetPassword }, dispatch } = this.props
    dispatch(generatePasswordResetLink(forgetPassword))
  }

  verifyTwoFactorAuthentication = () => {
    const { formValues: { twoFactorAuthForm: { code } }, dispatch, application: { authentication: { userId } } } = this.props
    if(isNil(userId)) return undefined
    let values = {}
    values.code = code
    values.professionalId = userId
    dispatch(verifyLogin(values))
  }

  getLogimModalContent = (type) => {
    if(type === 'Mobile Verification'){
      return(
        <FormSection name="twoFactorAuthForm">
          <TwoFactorAuthForm />
        </FormSection>
      )
    }
    if(type === 'Forget Password'){
      return(
        <FormSection name="forgetPassword">
          <ForgetPasswordForm showLoginForm={this.showLoginForm}/>
        </FormSection>
      )
    }
    return(
      <FormSection name="login">
        <LoginForm showForgetPasswordForm={this.showForgetPasswordForm}/>
      </FormSection>
    )
  }

  getModalSubmitText = (type) => {
    if(type === 'Mobile Verification'){
      return(
        <span>
          <Icon type="check-circle" /> Verify
        </span>
      )
    }
    if(type === 'Forget Password'){
      return(
        <span>
          <Icon type="link" /> Send Password Reset Link
        </span>
      )
    }
    return(
      <span>
        <Icon type="login" /> Login
      </span>
    )
  }

  render() {

    const { selected, loginModal, forgetPassword } = this.state
    const { valid, formValues= {}, application: { isLoading, twoFactorAuth, authentication: { auth, role, userId } } } = this.props
    // const { TextArea } = Input

    const modalType = twoFactorAuth ? 'Mobile Verification' : forgetPassword ? 'Forget Password' : 'Login'
    
    if(auth && !isEmptyOrNull(role)){
      return <Redirect to={ equals(role, 'professional') ? `/${role}/${userId}/timesheet` : `/${role}/${userId}` } />
    }
    return (
      <Spin spinning={isLoading} tip="Loading...">
        <div>
          <header className='header'>
              <div className='header-inner'>
                  <Row>
                    <Col xs={2} sm={2} md={3} lg={2} xl={3}>
                      
                    </Col>
                    <Col xs={20} sm={20} md={18} lg={18} xl={18}>
                    <div className='logo'></div>
                      <div>
                    <Button className='home-header-btn' ghost onClick={this.showLoginModal}>
                        <Icon type="login" /> Login
                    </Button>  
                    </div>                    
                    </Col>
                    <Col xs={2} sm={2} md={3} lg={2} xl={3}>
                      
                    </Col>
                  </Row>

                  <Row justify="space-between" >
                    <Col xs={2} sm={2} md={2} lg={2} xl={3}> </Col>
                    <Col xs={20} sm={20} md={20} lg={9} xl={9}>
                      <div className='intro-header'>
                        <div className='spacer'></div>
                        <div className='spacer'></div>
                          <h1 className='header-h1'>Welcome to {TITLE}</h1>
                          <h2 className='header-h2'>We have one goal to achieve:</h2>
                        

                        <div className='header-text-div'>
                          <p className="header-text">To provide a simplistic solution for Care
                          Homes and Professionals to link together.</p>
                          <p className="header-text-lower">Our seamless system allows simple and
                            straightforward connection between
                            Professionals and Care Homes without any
                            agency fees or percentages of earnings per
                            shift.
                          </p>
                          
                        </div>
                        <Button className='home-contact-btn phone-button' onClick={this.showLoginModal}>
                        <Icon type="user" /> Contact Us
                        </Button> 
                        <Button className='home-header-down-btn phone-button' onClick={this.showLoginModal}>
                        <Icon type="login" /> Login
                        </Button>  
                      </div>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={1} xl={2}> </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={7}>
                    <div className='spacer'></div>
                      <div className='signup-wrapper'>
                        <FormSection name="signup">
                          <SignupForm
                            selected={selected}
                            selectUser={this.selectUser}
                            valid={valid}
                            formValues={formValues}
                            registerUser={this.registerUser}
                          />
                        </FormSection>
                      </div>
                    </Col>
                    <Col xs={2} sm={1} md={2} lg={2} xl={3}> </Col>
                  </Row> 
              </div>
          </header>
        </div>
        <ModalBox
          title={modalType}
          size={600}
          visible={loginModal}
          content={this.getLogimModalContent(modalType)}
          submitText={this.getModalSubmitText(modalType)}
          cancelText={'Cancel'}
          submitHandler={
            twoFactorAuth ? this.verifyTwoFactorAuthentication :
            forgetPassword ? this.sendPasswordResetLink : this.login
          }
          cancelHandler={this.hideLoginModal}
        />
      </Spin>
    )
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('users')(state),
    application: state.account
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'users',
    initialValues: getUsersFormValues()
  })(Home)
)
