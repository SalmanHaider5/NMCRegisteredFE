import React from 'react'
import FileViewer from 'react-file-viewer'
import { split, last } from 'ramda'
import { SERVER_URL as url } from '../../constants'

export const DocumentViewer = ({ document }) => {
  const type = last(split('.', document))
  return (
    <FileViewer
      fileType={`${type}`}
      filePath={`${url}${document}`}
    />
  )
}