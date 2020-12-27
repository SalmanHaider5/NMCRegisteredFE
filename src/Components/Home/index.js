import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset, reduxForm, getFormValues, FormSection } from 'redux-form'
import { concat, isNil, prop, equals, not, empty } from 'ramda'
import { Icon } from 'antd'
import { register, verifyAccount, userLogin, generatePasswordResetLink, verifyLogin, reachUs } from '../../actions'
import { getUsersFormValues, isEmptyOrNull } from '../../utils/helpers'
import { Main } from './Main'
import { Loader, ModalBox } from '../../utils/custom-components'
import LoginForm from './Main/LoginForm'
import ForgetPasswordForm from './ForgetPasswordForm'
import TwoFactorAuthForm from './TwoFactorAuthForm'

import './home.css'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      role: '',
      loginModal: false,
      forgetPassword: false,
      contactFormModal: false
    }
  }

  componentDidMount(){
    const { match: { params }, dispatch } = this.props
    if(!isNil(prop('token', params))){
      dispatch(verifyAccount({ userId: params.userId, token: params.token  }))
    }
  }

  selectUser = (type) => {
    this.setState({ role: type })
  }

  registerUser = () => {
    const {
      formValues: { signup: { email, password } },
      dispatch
    } = this.props,
      { role } = this.state

    this.setState({ role: empty(role) })

    dispatch(register({ email, password, role }))
    
    dispatch(reset('users'))
  }

  showLoginModal = () => {
    this.setState({ loginModal: true, forgetPassword: false })
  }

  hideLoginModal = () => {
    const { dispatch } = this.props
    dispatch(reset('users'))
    this.setState({ loginModal: false, modalType: '' })
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
    this.hideLoginModal() 
  }

  verifyTwoFactorAuthentication = () => {
    const {
      formValues: { twoFactorAuthForm: { code } },
      dispatch,
      application: { authentication: { userId } }
    } = this.props

    if(isNil(userId)) return undefined

    let values = {}
    values.code = code
    values.professionalId = userId
    dispatch(verifyLogin(userId, values))
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
          <ForgetPasswordForm
            showLoginForm={this.showLoginForm}
          />
        </FormSection>
      )
    }
    return(
      <FormSection name="login">
        <LoginForm
          showForgetPasswordForm={this.showForgetPasswordForm}
        />
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

  sendMessage = () => {
    const { dispatch, formValues: { contactForm } } = this.props
    const { subject } =  contactForm
    contactForm.subject = concat(subject, '[Contact Form | Guest User]')
    dispatch(reachUs(contactForm))
    this.setState({ contactFormModal: false })
  }

  render() {

    const {
      role: userRole,
      loginModal,
      forgetPassword,
      contactFormModal
    } = this.state

    const {
      formValues= {},
      application: {
        isLoading,
        twoFactorAuth,
        authentication: {
          auth,
          role,
          userId
        }
      }
    } = this.props

    const modalType = twoFactorAuth ? 'Mobile Verification' : forgetPassword ? 'Forget Password' : contactFormModal ? 'Contact Us' :  'Login'

    if(auth &&  not(isEmptyOrNull(role))){
      return <Redirect to={ equals(role, 'professional') ? `/${role}/${userId}/timesheet` : `/${role}/${userId}/professionals` } />
    }

    return (
      <>
        <Loader
          size='large'
          isLoading={isLoading}
          loadingText={'Loading...'}
          wrapper={
            <Main
              role={userRole}
              formValues={formValues}
              selectUser={this.selectUser}
              registerUser={this.registerUser}
              sendMessage={this.sendMessage}
              showLoginModal={this.showLoginModal}
            />
          }
        />

        <ModalBox
          title={modalType}
          size={600}
          visible={loginModal}
          content={this.getLogimModalContent(modalType)}
          submitText={this.getModalSubmitText(modalType)}
          cancelText={<> <Icon type="close" /> Cancel </>}
          submitHandler={
            twoFactorAuth ? this.verifyTwoFactorAuthentication :
            forgetPassword ? this.sendPasswordResetLink : this.login
          }
          cancelHandler={this.hideLoginModal}
        />
      </>
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
