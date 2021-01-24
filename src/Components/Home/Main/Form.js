import React, { useState } from 'react'
import { FormSection } from 'redux-form'
import { Button, Icon, Drawer, Divider } from 'antd'
import SignupForm from './SignupForm'
import { PrivacyPolicy } from './PrivacyPolicy'

export const FormContainer = (props) => {

  const [privacyDrawer, setPrivacyDrawer] = useState(false)

  return (
    <div className="form-content">
      <div className="form">
        <Divider className="form-title">Sign Up</Divider>
        <FormSection name="signup">
          <SignupForm {...props} />
        </FormSection>
        <Button
          shape="round"
          type="primary"
          icon="file"
          onClick={() => setPrivacyDrawer(true)}
          className="full-btn success-btn"
        >
          Privacy Policy
        </Button>
      </div>
      <Drawer
        title={<><Icon type="paper-clip" /> Privacy Policy</>}
        placement="right"
        className="terms-drawer"
        maskStyle={{ backdropFilter: 'blur(3px)' }}
        closable={true}
        width={680}
        onClose={() => setPrivacyDrawer()}
        visible={privacyDrawer}
      >
        <PrivacyPolicy />
      </Drawer>
    </div>
  )
}
