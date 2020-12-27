import React, { useState } from 'react'
import { FormSection } from 'redux-form'
import { Button, Icon, Drawer } from 'antd'
import SignupForm from './SignupForm'
import ContactForm from '../ContactForm'

export const FormContainer = (props) => {

  const [contactDrawer, setContactDrawer] = useState(false)

  const { sendMessage } = props

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-title">Sign Up</h2>
        <FormSection name="signup">
          <SignupForm {...props} />
        </FormSection>
        <Button
          type="link"
          onClick={() => setContactDrawer(true)}
          className="contact-button"
        >
          Do you have any query?
        </Button>
      </div>
      <Drawer
        title={<><Icon type="mail" /> Contact Us </>}
        placement="right"
        className="contact-drawer"
        closable={true}
        onClose={() => setContactDrawer(false)}
        visible={contactDrawer}
        width={'40%'}
      >
        <FormSection name="contactForm">
          <ContactForm />
        </FormSection>
        <Button className="success-btn" onClick={sendMessage}>
          <Icon type="export" /> Send us a Message
        </Button>
      </Drawer>
    </div>
  )
}
