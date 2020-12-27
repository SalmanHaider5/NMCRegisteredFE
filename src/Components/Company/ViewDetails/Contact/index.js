import React from 'react'
import { FormSection } from 'redux-form'
import { Divider, Button, Icon } from 'antd'
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
            <Button
              shape="round"
              className="success-btn content-submit-btn"
              onClick={sendMessage}
            >
              <Icon type="export" /> Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
