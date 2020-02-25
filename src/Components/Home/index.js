import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, FormSection } from 'redux-form'
import { isNil, prop } from 'ramda'
import { Row, Col, Button, Input, Divider, Spin, Icon } from 'antd'
import { register, verifyAccount, userLogin } from '../../actions'
import { TITLE } from '../../constants'
import { ModalBox } from '../../utils/custom-components'
import { getUsersFormValues } from '../../utils/helpers'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import ForgetPasswordForm from './ForgetPasswordForm'

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
    this.setState({ loginModal: false })
  }

  login = () => {
    const { formValues: { login }, dispatch } = this.props
    dispatch(userLogin(login))
    dispatch(reset('users'))
  }

  showForgetPasswordForm = () => {
    this.setState({ forgetPassword: true })
  }

  showLoginForm = () => {
    this.setState({ forgetPassword: false })
  }


  render() {

    const { selected, loginModal, forgetPassword } = this.state
    const { valid, formValues= {}, application: { isLoading, authentication: { auth, role, userId } } } = this.props
    const { TextArea } = Input
    
    if(auth){
      return <Redirect to={role === 'professional' ? `/professional/${userId}` : `/company/${userId}` } />
    }

    return (
      <Spin spinning={isLoading} tip="Loading...">
        <div>
          <header className='header'>
              <div className='header-inner'>
                  <Row>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                      <p className='logo'>LOGO</p>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16}></Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                      <Button ghost onClick={this.showLoginModal}>Login</Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={2} sm={1} md={2} lg={2} xl={3}> </Col>
                    <Col xs={22} sm={9} md={10} lg={10} xl={9}>
                      <div className='intro-header'>
                        <div className='spacer'></div>
                          <h1 className='header-h1'>Welcome to {TITLE}</h1>
                        <Divider className='header-divider' />
                        <div>
                          <p className="header-text">Lorem ipsum Dummy text, Lorem ipsum dolor</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={2} sm={0} md={0} lg={2} xl={2}> </Col>
                    <Col xs={20} sm={13} md={10} lg={8} xl={6}>
                      <FormSection name="signup">
                        <SignupForm
                          selected={selected}
                          selectUser={this.selectUser}
                          valid={valid}
                          formValues={formValues}
                          registerUser={this.registerUser}
                        />
                      </FormSection>
                    </Col>
                    <Col xs={2} sm={1} md={2} lg={2} xl={4}> </Col>
                  </Row> 
              </div>
          </header>
          {/* header complete */}
          <section className='section-area'>
            <div>
              <div className='lower-section'>
                <Row>
                  <Col xs={0} sm={0} md={2} lg={2} xl={3}> </Col>
                  <Col xs={24} sm={24} md={9} lg={9} xl={7}>
                    <div className='about-us'>
                      <div className='us-content'>
                      <Divider className='sec-con-divider' type="vertical" /><h2>ABOUT US:</h2>
                        <div className='about-us-content'>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            large sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniamsed do eiusmod tempor
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>
                            large sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniamsed do eiusmod tempor
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            large sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniamsed do eiusmod tempor dolore magna aliqua.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={0} sm={0} md={2} lg={2} xl={3}> </Col>
                  <Col xs={24} sm={24} md={9} lg={9} xl={7}>
                    <div className='contact-us'>
                      <div className='us-content'>
                        <Divider className='sec-con-divider' type="vertical" /><h2>CONTACT US:</h2>
                          <div className='content-us-content'>
                            <form>
                              <div className='register-field'>
                                <label className='contact-label'>Name:</label>
                                <Input className='contact-input' size='large' />
                              </div>
                              <div className='register-field'> 
                                <label className='contact-label'>Email:</label>
                                <Input className='contact-input' size='large'/>
                              </div>
                              <div className='register-field'>
                                <label className='contact-label'>Subject:</label>
                                <Input className='contact-input'size='large' />
                              </div>
                              <div className='contact-textarea'>
                              <label className='contact-label'>Message:</label>
                                <TextArea className='contact-input text-area' rows={4} />
                              </div>
                              <div className='contact-btns'>
                                <Button className='register-btn contact-btn' size='large'>Send Message</Button>
                              </div>
                              <div className='contact-span'>
                                <span className='form-span'>this is new text</span>
                              </div>
                            </form>
                          </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={0} sm={0} md={2} lg={2} xl={4}> </Col>
                </Row>
              </div>
            </div>
          </section>
        </div>
        <ModalBox
          title={forgetPassword ? `Forget Password` : `Login`}
          size="large"
          visible={loginModal}
          content={forgetPassword ?
            <FormSection name="forgetPassword">
              <ForgetPasswordForm
                showLoginForm={this.showLoginForm}
              />
            </FormSection> :
            <FormSection
              name="login"
            >
              <LoginForm
                showForgetPasswordForm={this.showForgetPasswordForm}
              />
            </FormSection>
          }
          submitText={forgetPassword ?
            <span>
              <Icon type="check" />
              &nbsp;Save
            </span> :
            <span>
              <Icon type="login" />  
              &nbsp;Login
            </span>
          }
          cancelText={'Cancel'}
          submitHandler={this.login}
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
