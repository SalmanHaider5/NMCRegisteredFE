import React from 'react'
import { FormSection } from 'redux-form'
import { Divider, Button, Icon, Row, Col } from 'antd'
import ContactForm from './ContactForm'

const Contact = ({ sendMessage }) => {
  return (
    <div>
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Contact Us</h3>
          </div>
          <div>
            <Divider>Get in touch</Divider>
            <div className='change-password-div'>
              <FormSection name="contactForm">
                <ContactForm />
              </FormSection>
            </div>
            <Row>
              <Col span={5} offset={3}></Col>
              <Col span={12} offset={1} className="form-align-buttons">
                <Button className="success-btn" onClick={sendMessage}>
                  <Icon type="export" /> Send
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
