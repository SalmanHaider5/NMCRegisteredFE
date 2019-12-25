import React from 'react'

const adaptFileEventToValue = delegate => e => {
  delegate(e.target.files[0])
}

export const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta,
  ...props
}) => {
  return (
    <div className="file-input">
    <label>Image Upload: </label>
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
    />
    </div>
  )
}