import React from 'react'
import { Button, Icon } from 'antd'
import { DocumentViewer } from '../../../../utils/custom-components'

const ResumeViewer = ({ formValues }) => {
  const { document } = formValues
  return (
    <div className="document-viewer">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>CV/Resume</h3>
            <Button type="link">
              <Icon type="left" /> Back
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
export default ResumeViewer
