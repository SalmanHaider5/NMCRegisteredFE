import React from 'react'
import { Row, Col, Button, Icon, Divider } from 'antd'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired, isValidEmail, isPasswordMatched, isNumericCharacterExist, isCapitalCharacterExist, isMaxLengthValid } from '../../constants'



const SignupForm = ({
  selected,
  selectUser,
  valid,
  registerUser,
  formValues: { password, confirmPassword }
}) => {
  return (
    <div>
      <div className='form-wrapper'>
        <div><h2>Register as:</h2></div>
          <div>
          <form>
            <div>
              <Row className='form-radio-btn'>
                <Col span={11}>
                  <Button
                    onClick={() => selectUser('company')}
                    className='h-radio-btn1'
                    type={selected === 'company' ? 'primary' : 'default'}
                    size='large'
                    block
                  >
                    <Icon type="solution" />
                      Company
                  </Button>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                  <Button
                    onClick={() => selectUser('professional')}
                    className='h-radio-btn2'
                    type={selected === 'professional' ? 'primary' : 'default'}
                    size='large'
                    block
                  >
                    <Icon type="user" /> 
                      Professional
                  </Button>
                </Col>
                </Row>
            </div>
            <Divider>Register</Divider>
            <div className='register-field'>
              <Field
                name="email"
                component={TextField}
                hintText={'Enter Email'}
                size={'large'}
                type="text"
                validate={[isRequired, isValidEmail]}
                tooltipPlacement={'topRight'}
              />
            </div>
            <div className='register-field'> 
              <Field
                name="password"
                component={TextField}
                hintText={'Enter New Password'}
                size={'large'}
                type={'password'}
                validate={[isRequired, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid]}
                tooltipPlacement={'topRight'}
              />
            </div>
            <div className='register-field'>
              <Field
                name="confirmPassword"
                component={TextField}
                hintText={'Confirm New Password'}
                size={'large'}
                type={'password'}
                validate={[isRequired, isPasswordMatched]}
                tooltipPlacement={'topRight'}
              />
            </div>
              <Button
                onClick={registerUser}
                className='register-btn'
                size='large'
                block
                disabled={!valid || selected === ''}
              >
                <Icon type="user-add" /> Register
              </Button>
            {/* <div>
              <span className='form-span'>this is new text</span>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
