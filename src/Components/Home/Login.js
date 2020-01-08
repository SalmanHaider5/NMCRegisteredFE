import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { Card, Button, Icon } from 'antd'
import { checkEmail, verifyTemporaryPassword, registerAdmin, login } from '../../actions'
import { TextField } from './../../utils/custom-components/'
import { isRequired, isValidEmail } from './../../constants'


class Login extends Component {

  checkEmailStatus = () => {
    const { dispatch, formValues: { email } } = this.props
    dispatch(checkEmail(email))
  }

  checkPassword = () => {
    const { dispatch, login: { loginEmail: { temporaryPassword } }, formValues: { email, password } } = this.props
    if(temporaryPassword){
      dispatch(verifyTemporaryPassword({ password }))
    }else{
      dispatch(login({ email, password }))
    }
  }

  registerAdmin = () => {
    const { dispatch, formValues: { email, newPassword, confirmPassword } } = this.props
    if(newPassword === confirmPassword){
      dispatch(registerAdmin({ email, password: newPassword }))
    }
  }

  render() {
    const {
      login:{
        loginEmail: {
          temporaryPassword,
          password,
          code,
          message
        },
        loginPassword,
        verification:{
          auth
        }
      },
      invalid
    } = this.props


    return (
      <div className="login-page">
        <div className="login">
          <Card className="login-form" title="Admin Login">
            <div className="form">
              { auth && <Redirect to="/orders" /> }
              { !loginPassword.newPassword ?
                <div className="form-fields">
                  <div className="field">
                    <Field
                      name="email"
                      label="Email"
                      component={TextField}
                      hintText="Enter Login Email"
                      validate={[isRequired, isValidEmail]}
                    />
                    {
                      code === 'Error' ?
                      <span className="login-error">{message}</span>:
                      code === 'Success' ?
                      <span className="login-message">{message}</span>:
                      ''
                    }
                  </div>
                  {
                    password === true || temporaryPassword === true ?
                    <div className="field">
                      <Field
                        name="password"
                        label="Password"
                        component={TextField}
                        type="password"
                        hintText="Enter Password"
                        validate={[isRequired]}
                      />
                      {
                        loginPassword.code === 'Error' ?
                        <span className="login-error">{loginPassword.message}</span>:
                        ''
                      }
                    </div>:
                    ''
                  }
                </div>
                :
                <div className="form-fields">
                  <h2>Choose new Password</h2>
                  <div className="field">
                    <Field
                      name="newPassword"
                      label="New Password"
                      component={TextField}
                      type="password"
                      hintText="Enter New Password"
                      validate={[isRequired]}
                    />
                  </div>
                  <div className="field">
                    <Field
                      name="confirmPassword"
                      label="Confirm Password"
                      component={TextField}
                      type="password"
                      hintText="Re-enter New Password"
                      validate={[isRequired]}
                    />
                  </div>
                </div>
              }
              
              <div className="form-buttons">
                <Button
                  type="primary"
                  onClick={!temporaryPassword ? password ? this.checkPassword :  this.checkEmailStatus : loginPassword.newPassword ? this.registerAdmin : this.checkPassword}
                  disabled={invalid}
                >
                  <Icon type={loginPassword.newPassword ? 'check' : 'login'} />
                  { loginPassword.newPassword ? 'Save' : 'Login' }
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    formValues: getFormValues('login')(state),
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'login'
  })(Login)
)