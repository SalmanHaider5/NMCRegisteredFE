import React from 'react'
import { DocumentViewer } from '../../../../../utils/custom-components'

const ResumeViewer = ({ formValues }) => {
  const { document } = formValues
  return (
    <div className="document-viewer">
      <DocumentViewer
        document={document}
      />
    </div>
  )
}
export default ResumeViewer
