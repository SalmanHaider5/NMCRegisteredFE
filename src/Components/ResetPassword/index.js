import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormValues, reduxForm, reset } from 'redux-form'
import { Row, Col, Card, Icon, Button } from 'antd'
import { resetUserPassword } from '../../actions'
import { getResetPasswordFormValues } from '../../utils/helpers'
import Header from '../Header'
import ResetPasswordForm from './ResetPasswordForm'

class ResetPassword extends Component {

  resetPassword = () => {
    const { formValues, match: { params: { userId, token } }, dispatch, history } = this.props
    formValues.token = token
    dispatch(resetUserPassword(userId, formValues))
    dispatch(reset('resetPassword'))
    history.push('/')
  }

  goToHome = () => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    const { invalid } = this.props
    return (
      <>
        <Header loggedIn={false} clickHandler={this.goToHome} />
        <div className="addform-container">
          <Row gutter={16} className="addform-panel">
            <Col span={5} offset={1} className="progress-panel">
              <div className="progress-tail">
                <Icon type="unlock" className="form-icon" />
              </div>
            </Col>
            <Col span={19} className="form-panel">
              <Card
                title={<><Icon type="unlock" /> ResetPassword </>}
                bordered={false}
              >
                <ResetPasswordForm />
                <Row>
                  <Col span={5} offset={3}></Col>
                  <Col span={12} offset={1} className="form-actions">
                    <Button className="success-btn" onClick={this.resetPassword} disabled={invalid}>
                      <Icon type="redo" />
                      Reset Password
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return{
    formValues: getFormValues('resetPassword')(state)
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'resetPassword',
    initialValues: getResetPasswordFormValues()
  })(ResetPassword)
)
